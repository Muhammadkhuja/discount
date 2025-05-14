import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./model/address.model";
import { Op } from "sequelize";

@Injectable()
export class BotsService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          user_name: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          lang: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, <b> 📞 Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else if (!user.status || !user.phone_number) {
        await ctx.replyWithHTML(
          `Iltimos, <b>Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          "Bu yo'l orqali Skidkachi dasturida Sotuvchilar faollashtiriladi",
          { ...Markup.removeKeyboard() }
        );
      }
    } catch (error) {
      console.log(`Error on Start`, error);
    }
  }
  async onContact(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      } else if (user.phone_number) {
        await this.bot.telegram.sendChatAction(user_id!, "typing");
        await ctx.replyWithHTML(
          "savol nechimarta kontakt jo'natmoqchisiz a 🤨",
          { ...Markup.removeKeyboard() }
        );
      } else if (
        "contact" in ctx.message! &&
        ctx.message!.contact.user_id != user_id
      ) {
        await ctx.replyWithHTML(`Iltimos o'zingizni telefon raqamni yuboring`, {
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞 Telefon raqamni yuborish")],
          ])
            .oneTime()
            .resize(),
        });
      } else if ("contact" in ctx.message!) {
        let phone = ctx.message.contact.phone_number;
        if (phone[0] != "+") {
          phone = "+" + phone;
        }
        user.phone_number = phone;
        user.status = true;
        await user.save();
        await ctx.replyWithHTML(`Tabrik ro'yxatdan o'tdiz`, {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log(`Error on Contact`, error);
    }
  }

  // async onLocation(ctx: Context) {
  //   const user_id = ctx.from?.id;
  //   const user = await this.botModel.findByPk(user_id);

  //   try {
  //     if (!user) {
  //       await ctx.replyWithHTML("<b>/start ni bosing</b>", {
  //         ...Markup.keyboard([["/start"]])
  //           .oneTime()
  //           .resize(),
  //       });
  //     } else if (user.location) {
  //       await ctx.replyWithHTML("<b>borsanku yan otamn deydiya</b>", {
  //         ...Markup.removeKeyboard(),
  //       });
  //     } else if ("location" in ctx.message!) {
  //       const location = ctx.message.location;
  //       await this.botModel.update(
  //         { location: JSON.stringify(location) },
  //         { where: { user_id: user_id } }
  //       );

  //       await ctx.reply("Joylashuvingiz saqlandi!", {
  //         reply_markup: {
  //           keyboard: [["📄 User haqida"]],
  //           resize_keyboard: true,
  //           one_time_keyboard: false,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Errorr onContact", error);
  //   }
  // }


  async onLocation(ctx: Context){
    try {
      if("location" in ctx.message!){
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);
        if(!user){
          await ctx.reply("Siz avval ro'yxatdan o'ting",{
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]]).resize(),
          });
        }else{
          const address = await this.addressModel.findOne({
            where:{
              user_id,
              last_state: { [Op.ne]: "finish"},
            },
            order: [["id", "DESC"]],
          });
          if(address && address.last_state == "location"){
            address.location = `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`;
            address.last_state = "finish";
            await address.save()
            await ctx.reply("Manzil saqlandi", {
              parse_mode: "HTML",
              ...Markup.keyboard([
                ["Mening manzillarim", "Yangi manzillar qo'shish"],
              ]).resize()
            })
          }
        }
      }
    } catch (error) {
      console.log("OnLocation error:", error);
      
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();
        await ctx.replyWithHTML(
          `Shu bot da yoq agaer faol qimoqchi bo'sez tezz <b>start</b> de `,
          {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Contact`, error);
    }
  }

  async sendOtp(phone_number: string, OTP: string) {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendMessage(user.user_id, `Verif code: ${OTP}`);
      return true;
    } catch (error) {
      console.log(`Error on sendOtp`, error);
    }
  }

  async OnText(ctx: Context) {
    if ("text" in ctx.message!) {
      try {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);
        if (!user) {
          await ctx.replyWithHTML(`bos <b>start</b> ni e `, {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: {
              user_id,
              last_state: { [Op.ne]: "finish" },
            },
            order: [["id", "DESC"]],
          });
          if (address) {
            const userInput = ctx.message.text;
            switch (address.last_state) {
              case "name":
                address.name = userInput;
                address.last_state = "address";
                await address.save();
                await ctx.reply("Manzilingizni kiriting:", {
                  parse_mode: "HTML",
                  ...Markup.removeKeyboard(),
                });
                break;

              case "address":
                address.address = userInput;
                address.last_state = "location";
                await address.save();
                await ctx.reply("Manzilingizni locatsiyasini yuboring:", {
                  parse_mode: "HTML",
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("Lokatsiyani yubiring")],
                  ]).resize(),
                });
                break;
            }
          }
        }
      } catch (error) {
        console.log(`Error on Contact`, error);
      }
    }
  }

  async admin_menu(ctx: Context, menu_text = `<b>Admin menyusi</b>`){
    try {
      await ctx.reply(menu_text, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          "Mening manzillarim",
          "Yangi manzillar qo'shish",
        ])
        .oneTime()
        .resize()
      });
    } catch (error) {
      console.log("Admin menyu sida xatolik", error);
      
    }
  }
}
