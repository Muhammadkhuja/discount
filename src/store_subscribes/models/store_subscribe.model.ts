import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Store } from "../../store/models/store.model";

interface IStoreSubscribeCreateAttr {
  userId: number;
  storeId: number;
}

@Table({ tableName: "store_subscribes"})
export class StoreSubscribe extends Model<
  StoreSubscribe,
  IStoreSubscribeCreateAttr
> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  declare userId: number;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.BIGINT,
  })
  declare storeId: number;
}
