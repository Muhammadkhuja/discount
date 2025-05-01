import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SingInDto } from "./dto/sing-in.dto";
import { Request, Response } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sing-up")
  async singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }

  @Post("sing-in")
  async singIn(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singIn(singInDto, res);
  }
  @Post("sing-out")
  async singOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOut(req, res);
  }

  @Post("sing-out2")
  async SingOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.SingOut(refreshToken, res);
  }


  @Post("user-refresh")
  async UserrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.UserrefreshToken(req, res);
  }

  @HttpCode(200)
  @Post(":id/user-refresh2")
  async userrefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.userrefreshToken(id,refreshToken, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Post("admin-sing-up")
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Post("admin-sing-in")
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }
  @Post("admin-sing-out")
  async singOutaAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutaAdmin(req, res);
  }
  @Post("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }
}
