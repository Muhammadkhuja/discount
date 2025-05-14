import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreation {
  user_id: number | undefined;
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
  })
  declare name: string;


  @Column({
    type: DataType.STRING(50),
  })
  declare address: string;


  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;


  @Column({
    type: DataType.STRING(50),
  })
  declare location: string;


  @Column({
    type: DataType.STRING(50),
  })
  declare last_state: string;
}
