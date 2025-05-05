import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Discount } from "../../discounts/models/discount.model";

interface IFavouriteCreateAttr {
  userId: number;
  discountId: number;
}

@Table({ tableName: "favourites", timestamps: false })
export class Favourite extends Model<Favourite, IFavouriteCreateAttr> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  declare userId: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.BIGINT,
  })
  declare discountId: number;
}
