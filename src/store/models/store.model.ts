import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { User } from "../../users/models/user.model";
import { District } from "../../district/models/district.model";
import { Status } from "../../status/models/status.model";
import { Discount } from "../../discounts/models/discount.model";
import { StoreSocialLink } from "../../store_social_links/models/store_social_link.model";

interface IStoreCreateAttr {
  name: string;
  location: string;
  phone: string;
  ownerId: number;
  description: string;
  regionId: number;
  districtId: number;
  address: string;
  statusId: number;
  open_time: string;
  close_time: string;
  weekday: number;
}

@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare location: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare ownerId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  declare regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  declare districtId: number;

  @BelongsTo(() => District)
  district: District;

  @Column({ type: DataType.STRING })
  declare address: string;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  declare statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @Column({
    type: DataType.TIME,
  })
  declare open_time: string;

  @Column({
    type: DataType.TIME,
  })
  declare close_time: string;

  @Column({ type: DataType.INTEGER })
  declare weekday: number;

  @HasMany(() => Discount)
  discount: Discount[];

  @HasMany(() => StoreSocialLink)
  storeSLink: StoreSocialLink[];
}
