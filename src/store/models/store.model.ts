import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { Status } from "../../status/models/status.model";

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
  open_time?: string;
  close_time?: string;
  weekday: number;
}

@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number;

  @Column({ type: DataType.STRING})
  declare name: string;

  @Column({ type: DataType.STRING})
  declare location: string;

  @Column({ type: DataType.STRING})
  declare phone: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT})
  declare owner_id: number;

  @BelongsTo(() => User)
  declare owner: User;

  @Column({ type: DataType.STRING})
  declare description: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT})
  declare region_id: number;

  @BelongsTo(() => Region)
  declare region: Region;

  @ForeignKey(() => District)
  @Column({ type: DataType.BIGINT})
  declare district_id: number;

  @BelongsTo(() => District)
  declare district: District;

  @Column({ type: DataType.TEXT})
  declare address: string;

  @ForeignKey(() => Status)
  @Column({ type: DataType.BIGINT})
  declare status_id: number;

  @BelongsTo(() => Status)
  declare status: Status;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare open_time: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare close_time: string;

  @Column({ type: DataType.TINYINT})
  declare weekday: number;
}
