import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Region } from "../../region/models/region.model";

interface IDistrictCreateAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district" })
export class District extends Model<District, IDistrictCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.BIGINT
  })
  declare region_id: number;
}
