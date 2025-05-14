import { Module } from "@nestjs/common";
import { BotsService } from "./bots.service";
import { BotUpadte } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { Address } from "./model/address.model";
import { AddressUpadte } from "./address/bot.address.update";
import { AddressService } from "./address/bots.address.service";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address])],
  controllers: [],
  providers: [BotsService,AddressService,  AddressUpadte, BotUpadte ],
  exports: [BotsService],
})
export class BotsModule {}
