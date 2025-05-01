import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Store } from "../../store/models/store.model";

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
    type: DataType.STRING,
  })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  declare regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Store)
  store: Store[];
}
