import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";

interface ICategoryCreateAttr {
  name: string;
  description: string;
  parentId: number;
}

@Table({ tableName: "category" })
export class Category extends Model<Category, ICategoryCreateAttr> {
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
    type: DataType.TEXT
  })
  declare description: string;


  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT })
  declare parentId: number;

  @BelongsTo(() => Category)
  category: Category


  @HasMany(() => Category)
  categorys = Category

    @HasMany(() => Discount)
    discount: Discount[];
}
