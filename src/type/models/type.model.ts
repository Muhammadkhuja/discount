import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ITypeCreateAttr {
  name: string;
  description: string;
}

@Table({ tableName: "type" })
export class Type extends Model<Type, ITypeCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;
}
