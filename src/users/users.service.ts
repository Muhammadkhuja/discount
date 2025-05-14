import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { PhoneUserDto } from "./dto/phone-user.dto";

import * as otpGeneretor from "otp-generator";
import { BotsService } from "../bots/bots.service";

import * as uuid from "uuid";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly mailService: MailService,
    private readonly botService: BotsService,
    private readonly smsService: SmsService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("jo'natilmid krch Emailga xat");
    }
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findByRefresh(refresh_token: string) {
    const users = await this.userModel.findAll();

    for (const user of users) {
      const match = await bcrypt.compare(
        refresh_token,
        user.hashed_refresh_token
      );
      if (match) return user;
    }

    return null;
  }

  //-------------------------------------------------------------------------------------------------

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updateUser = await this.userModel.update(
      { hashed_refresh_token },
      {
        where: { id },
      }
    );
    return updateUser;
  }

  //-------------------------------------------------------------------------------------------------

  findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updateUser = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    return updateUser[1][0];
  }

  async remove(id: number) {
    const removeuser = await this.userModel.destroy({ where: { id } });
    if (removeuser > 0) {
      return `Yo bob kedi krch`;
    }
    return "aqlin yetmasa nega o'chirasan a";
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link yo sanga !");
    }

    const updayeUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updayeUser[1][0]) {
      throw new BadRequestException("Sanida ham miyya bor ekan a");
    }

    return {
      message: "User bor ",
      is_active: updayeUser[1][0].is_active,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { varification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedDate = await decode(varification_key);
    const details = JSON.parse(decodedDate);
    if (details.phone_number != phone_number) {
      throw new BadRequestException("telefonga yubodi");
    }
    const reusltOtp = await this.otpModel.findByPk(details.otp_id);

    if (reusltOtp == null) {
      throw new BadRequestException("Bunday Otp yo'q");
    }
    if (reusltOtp.verified) {
      throw new BadRequestException("Bu Otp avval tekshirilgan");
    }
    if (reusltOtp.expiration_time < currentDate) {
      throw new BadRequestException("Vaqt bo'tam vaqt");
    }
    if (reusltOtp.otp != otp) {
      throw new BadRequestException("Mos emas de");
    }

    const user = await this.userModel.update(
      {
        is_owner: true,
      },
      {
        where: { phone: phone_number },
        returning: true,
      }
    );
    if (!user[1][0]) {
      throw new BadRequestException("Bunday raqamli foydalanuvchi yo'q");
    }

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } }
    );
    return {
      message: "Tabriklayman siz ovner bo'ldiz",
    };
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGeneretor.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //-----------------------------------------------BOT-----------------------------------------------
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Avval ro'yxatdan o'ting");
    }
    // return {message: "Otp bo'tga yuborildi"}
    //-----------------------------------------------SMS-----------------------------------------------

    const response = await this.smsService.sendSMS(phone_number, otp);
    if (response.status != 200) {
      throw new ServiceUnavailableException("OTP yuborishda xatolik");
    }
    const message = 
    `OTP code has been send to **** ` +
    phone_number.slice(phone_number.length - 4)

    //----------------------------------------------EMAIL----------------------------------------------
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };
    const encodedData = await encode(JSON.stringify(details));
    return {
      message: "Otp botga jonatildi",
      verification_key: encodedData,
      messageSMS: message
    };
  }
}
