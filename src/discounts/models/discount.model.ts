import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { Category } from "../../category/models/category.model";
import { SocialMediaType } from "../../social_media_type/models/social_media_type.model";

interface IDiscountCreateAttr {
  storeId: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  categoryId: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  typeId: number;
}

@Table({ tableName: "discounts" })
export class Discount extends Model<Discount, IDiscountCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.BIGINT,
  })
  declare storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(8, 2),
  })
  declare discount_percent: number;

  @Column({
    type: DataType.DATE,
  })
  declare start_date: string;

  @Column({
    type: DataType.DATE,
  })
  declare end_date: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
  })
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column({
    type: DataType.DECIMAL(8, 2),
  })
  declare discount_value: number;

  @Column({
    type: DataType.STRING,
  })
  declare special_link: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  declare is_active: boolean;

  @ForeignKey(() => SocialMediaType)
  @Column({
    type: DataType.BIGINT,
  })
  declare typeId: number;

  @BelongsTo(() => SocialMediaType)
  type: SocialMediaType;
}
