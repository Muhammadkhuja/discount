import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { MailModule } from "../mail/mail.module";
import { BotsModule } from "../bots/bots.module";
import { Otp } from "./models/otp.model";
import { SmsModule } from "../sms/sms.module";

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]), MailModule,SmsModule, BotsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
