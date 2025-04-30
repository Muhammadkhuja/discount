import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreateAttr {
  full_name: string;
  username: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, IAdminCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creator: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: string;
}
