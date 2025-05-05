import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMediaCreateAttr {
  name: string;
  file: string;
  table_name: string;
  tableId: number;
}

@Table({ tableName: "media" })
export class Media extends Model<Media, IMediaCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare file: string;

  @Column({ type: DataType.STRING })
  declare table_name: string;

  @Column({ type: DataType.BIGINT })
  declare tableId: number;
}
