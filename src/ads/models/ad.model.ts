import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdsCreateAttr {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  target_url: string;
  placement: string;
  status: boolean;
  view_count: number;
}

@Table({ tableName: "ads" })
export class Ads extends Model<Ads, IAdsCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.DATE })
  declare start_date: string;

  @Column({ type: DataType.DATE })
  declare end_date: string;

  @Column({ type: DataType.STRING })
  declare target_url: string;

  @Column({ type: DataType.STRING })
  declare placement: string;

  @Column({ type: DataType.BOOLEAN })
  declare status: boolean;

  @Column({ type: DataType.BIGINT })
  declare view_count: number;
}
