import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from './users/users.module';
import { User } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { RegionModule } from './region/region.module';
import { StoreModule } from './store/store.module';
import { StatusModule } from './status/status.module';
import { DistrictModule } from './district/district.module';
import { Status } from "./status/models/status.model";
import { Store } from "./store/models/store.model";
import { Region } from "./region/models/region.model";
import { District } from "./district/models/district.model";
import { Admin } from "./admin/models/admin.model";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
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
      models: [User, Status, Store, Region, District, Admin],
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
    DistrictModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
