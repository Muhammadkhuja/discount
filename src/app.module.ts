import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { RegionModule } from "./region/region.module";
import { StoreModule } from "./store/store.module";
import { StatusModule } from "./status/status.module";
import { DistrictModule } from "./district/district.module";
import { Status } from "./status/models/status.model";
import { Store } from "./store/models/store.model";
import { Region } from "./region/models/region.model";
import { District } from "./district/models/district.model";
import { Admin } from "./admin/models/admin.model";
import { BotsModule } from "./bots/bots.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { TypeModule } from "./type/type.module";
import { CategoryModule } from "./category/category.module";
import { SocialMediaTypeModule } from "./social_media_type/social_media_type.module";
import { StoreSocialLinksModule } from "./store_social_links/store_social_links.module";
import { DiscountsModule } from "./discounts/discounts.module";
import { Discount } from "./discounts/models/discount.model";
import { Category } from "./category/models/category.model";
import { Type } from "./type/models/type.model";
import { SocialMediaType } from "./social_media_type/models/social_media_type.model";
import { StoreSocialLink } from "./store_social_links/models/store_social_link.model";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotsModule],
      }),
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PH_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Status,
        Store,
        Region,
        District,
        Admin,
        Discount,
        Category,
        Type,
        SocialMediaType,
        StoreSocialLink,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    RegionModule,
    StoreModule,
    StatusModule,
    DistrictModule,
    BotsModule,
    TypeModule,
    CategoryModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    DiscountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
