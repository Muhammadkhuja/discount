import { Module } from "@nestjs/common";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/models/district.model";
import { User } from "../../users/models/user.model";
import { Store } from "../../store/models/store.model";

interface IRegionCreateAttr {
  name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, IRegionCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;


  @HasMany(()=>District)
  district: District[]

  @HasMany(()=>User)
  user: User[]

  @HasMany(()=>Store)
  store: Store[]
}
