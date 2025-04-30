import { BadGatewayException, BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService
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
      throw new ServiceUnavailableException("Emailga xat yuborishda hatolik");
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
    const users = await this.userModel.findAll()

    for (const user of users) {
      const match = await bcrypt.compare(
        refresh_token,
        user.hashed_refresh_token
      )
      if (match) return user
    }

    return null
  }

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
      throw new BadRequestException("Activation link not foundet");
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
      throw new BadRequestException("User already activate");
    }

    return {
      message: "User actiavted successfully",
      is_active: updayeUser[1][0].is_active,
    };
  }


}
