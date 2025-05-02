import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Discount } from "../../discounts/models/discount.model";
import { StoreSocialLink } from "../../store_social_links/models/store_social_link.model";

interface ISocialMediaTypeCreateAttr {
  basedUrl: string;
  isActive: boolean;
}

@Table({ tableName: "social_media_type" })
export class SocialMediaType extends Model<
  SocialMediaType,
  ISocialMediaTypeCreateAttr
> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare basedUrl: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @HasMany(() => Discount)
  discount: Discount[];

  @HasMany(() => StoreSocialLink)
  storeSLink: StoreSocialLink[];
}
