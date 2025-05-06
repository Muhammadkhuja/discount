import { Command, Ctx, Hears, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotsService } from "../bots.service";
import { AddressService } from "./bots.address.service";

@Update()
export class AddressUpadte {
  constructor(
    private readonly botService: BotsService,
    private readonly addressService: AddressService
  ) {}

  @Command("address")
  async OnAddress(@Ctx() ctx: Context) {
    return this.addressService.OnAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async OnNewAddress(@Ctx() ctx: Context){
    return this.addressService.OnNewAddress(ctx)
  }
}
