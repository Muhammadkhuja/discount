import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreation {
  user_id: number;
  last_state: string
}

@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare address: string;


  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare user_id: string;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare location: string;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare last_state: string;
}
