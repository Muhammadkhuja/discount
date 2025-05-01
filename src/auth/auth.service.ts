import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SingInDto } from "./dto/sing-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Admin } from "../admin/models/admin.model";
import { AdminService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async UsergenerateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToekn, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToekn,
      refreshToken,
    };
  }

  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async singUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newUser = await this.userService.create(createUserDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async singIn(singInDto: SingInDto, res: Response) {
    const user = await this.userService.findUserByEmail(singInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    if (!user.is_active) {
      throw new BadRequestException("Avval emailni tasqdilang");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      user.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.UsergenerateToken(user);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToekn,
    };
  }

  async singOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const user = await this.userService.findByRefresh(refresh_token);

    if (!user) {
      throw new BadRequestException("Token yo'q yoki noto'g'ri");
    }
    user.hashed_refresh_token = "";
    await user.save();

    res.clearCookie("refresh_token");

    return { messgae: "siz bu yerda yo'qsiz !" };
  }

  async SingOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }
    const hashed_refresh_token = "";
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      messgae: "User yo krch",
    };
    return response;
  }

  async userrefreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    console.log(userId);
    console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat yo diyildi");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not founded");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );

    if(!tokenMatch){
      throw new ForbiddenException("Forbidden")
    }

    const {accessToekn, refreshToken}  = await this.UsergenerateToken(user);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7)
    await this.userService.updateRefreshToken(user.id, hashed_refresh_token)

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true
    })

    const response = {
      message: "User refreshed",
      userId: user.id,
      access_toekn: accessToekn
    }
    return response
  }

  async UserrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const users = await this.userService.findAll();
    const user = users.find(
      (user) =>
        user.hashed_refresh_token &&
        bcrypt.compareSync(refresh_token, user.hashed_refresh_token)
    );

    if (!user) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.UsergenerateToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yengii ",
      accessToken: tokens.accessToekn,
    };
  }
  //-------------------------------------------------------------------------------------------------
  async singUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", adminId: newAdmin.id };
  }

  async singInAdmin(singInDto: SingInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(singInDto.email);

    if (!admin) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.dataValues.hashed_password
    );
    console.log("Parol:", singInDto.password);
    console.log("Xesh qilingan parol:", admin.hashed_password);

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async singOutaAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    console.log(refresh_token);

    const admin = await this.adminService.findAdminByRefresh(refresh_token);

    if (!admin) {
      throw new BadRequestException("Token yo'q yoki noto'g'ri");
    }
    admin.hashed_refresh_token = "";
    await admin.save();

    res.clearCookie("refresh_token");

    return { messgae: "siz bu yerda yo'qsiz !" };
  }

  async AdminrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const admins = await this.adminService.findAll();
    const admin = admins.find(
      (admin) =>
        admin.hashed_refresh_token &&
        bcrypt.compareSync(refresh_token, admin.hashed_refresh_token)
    );

    if (!admin) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yengii ",
      accessToken: tokens.accessToken,
    };
  }
}
