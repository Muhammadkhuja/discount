import { Module } from "@nestjs/common";
import { Column, DataType, Model, Table } from "sequelize-typescript";

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
}
