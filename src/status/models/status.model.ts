import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "../../store/models/store.model";

interface IStatusCreateAttr {
  name: string;
  description: string;
}

@Table({ tableName: "status" })
export class Status extends Model<Status, IStatusCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.STRING
  })
  declare description: string;

    @HasMany(() => Store)
    store: Store[];
}
