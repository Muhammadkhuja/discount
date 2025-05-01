import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Store } from "../../store/models/store.model";

interface IUserCreateAttr {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  location: string;
  regionId: number;
}
@Table({ tableName: "users" })
export class User extends Model<User, IUserCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({ type: DataType.STRING(50), allowNull: false })
  declare name: string;
  @Column({ type: DataType.STRING(15), unique: true, allowNull: false })
  declare phone: string;
  @Column({ type: DataType.STRING(50), unique: true, allowNull: false })
  declare email: string;
  @Column({ type: DataType.STRING })
  declare hashed_password: string;
  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_owner: boolean;
  @Column({ type: DataType.STRING })
  declare location: string;
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4() })
  declare activation_link: string;

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
