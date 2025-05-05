import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Discount } from "../../discounts/models/discount.model";

export interface IReviewCreateAttr {
  discountId: number;
  userId: number;
  comment: string;
  rating: number;
}

@Table({ tableName: "reviews", timestamps: false })
export class Review extends Model<Review, IReviewCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.BIGINT,
  })
  declare discountId: number;
  @BelongsTo(() => Discount)
  discount: Discount;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  declare userId: number;
  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
  })
  declare comment: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare rating: number;
}
