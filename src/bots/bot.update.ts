import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotsService } from "./bots.service";

@Update()
export class BotUpadte {
  constructor(private readonly botService: BotsService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx);
  }

  // @On("photo")
  // async OnPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async OnVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_size));
  //     await ctx.replyWithVideo(String(ctx.message.video.file_id));
  //   }
  // }

  // @On("sticker")
  // async Onstiker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(ctx.message.sticker.file_id);
  //   }
  // }

  // @On("animation")
  // async OnAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithSticker(ctx.message.animation.file_id);
  //   }
  // }

  // @On("document")
  // async OnDoc(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.reply(ctx.message.document.file_name!);
  //   }
  // }

  @On("contact")
  async OnContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @Command("stop")
  async OnStop(@Ctx() ctx: Context) {
    return this.botService.onStop(ctx);
  }

  // @On("location")
  // async Onlocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.longitude,
  //       ctx.message.location.latitude
  //     );
  //   }
  // }

  // @On("voice")
  // async OnVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(ctx.message.voice.file_id);
  //   }
  // }

  // @Hears("hi")
  // async onHearshi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey there");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply("Ertaga kelin");
  // }

  // @Command("inline")
  // async onCommandLine(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Bos 1",
  //         callback_data: "buuton_1",
  //       },
  //       {
  //         text: "Bos 2",
  //         callback_data: "buuton_2",
  //       },
  //       {
  //         text: "Bos 3",
  //         callback_data: "buuton_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Bos 4",
  //         callback_data: "buuton_4",
  //       },
  //       {
  //         text: "Bos 5",
  //         callback_data: "buuton_5",
  //       },
  //       {
  //         text: "Bos 6",
  //         callback_data: "buuton_6",
  //       },
  //     ],
  //   ];

  //   await ctx.reply("kerakli tugani tanlang", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("buuton_1")
  // async anActionBuuton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button 1 bosildi");
  // }
  // @Action("buuton_2")
  // async anActionBuuton2(@Ctx() ctx: Context) {
  //   await ctx.reply("Button 2 bosildi");
  // }
  // @Action(/^buuton_\d+$/)
  // async anActionBuuton(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const burronData = ctx.callbackQuery.data;
  //     const id = burronData.split("_")[1];
  //     await ctx.reply(`${id} Button bosildi`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     ["bir", "ikki", "uch"],
  //     ["to'rt", "besh"],
  //     ["olti"],
  //     [Markup.button.contactRequest("Telefon raqamizni yuboring")],
  //     [Markup.button.locationRequest("Manzilni yuboring")]
  //   ];

  //   await ctx.reply("kerakli Main buttonni tanlang", {
  //     ...Markup.keyboard(inlineKeyboard).resize(),
  //   });
  // }

  // @Hears("bir")
  // async onHearButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Main Button 1 bosildi");
  // }

  @On("text")
  async OnText(@Ctx() ctx: Context) {
    return this.botService.OnText(ctx);
  }
  @On("message")
  async OnMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
    console.log(ctx.from!.username);
  }
}
