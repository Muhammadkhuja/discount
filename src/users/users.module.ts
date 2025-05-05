import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { MailModule } from "../mail/mail.module";
import { BotsModule } from "../bots/bots.module";

@Module({
  imports: [SequelizeModule.forFeature([User]), MailModule, BotsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
