// import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { ConfigService } from '@nestjs/config';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


// @Module({
//   imports: [
//     MailerModule.forRootAsync({
//       useFactory:async(config:ConfigService)()=>({
//         transport:{
//           host:config.get<string>("SMTP_HOST"),
//           secure: false,
//           auth:{
//             user: config.get<string>("SMTP_USER"),
//             pass: config.get<string>("SMTP_PASSWORD")
//           }
//         }
//         default:{
//           from: `"Skidkachi"<${config.get<string>("SMTP_HOST")}>`
//         }
//         template:{
//           dir: join(__dirname, "templates"),
//           adapter: new HandlebarsAdapter()
//           template: 'confirmation',
//           options: {
//             strict: true
//           }
//         }
//       }),
//       inject:[ConfigService],
//     })
//   ],
//   providers: [MailService],
//   exports: [MailService]
// })
// export class MailModule {}



import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: `"Skidkachi" <${config.get<string>("SMTP_USER")}>`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
