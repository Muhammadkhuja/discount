import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { SocialMediaType } from "../../social_media_type/models/social_media_type.model";

interface IStoreSocialLinkCreateAttr {
  url: string;
  description: string;
  storeId: number;
  socialmediatypeId: number;
}

@Table({ tableName: "store_social_links" })
export class StoreSocialLink extends Model<
  StoreSocialLink,
  IStoreSocialLinkCreateAttr
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
  declare url: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.BIGINT,
  })
  declare storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @ForeignKey(() => SocialMediaType)
  @Column({
    type: DataType.BIGINT,
  })
  declare socialmediatypeId: number;

  @BelongsTo(() => SocialMediaType)
  socialMediaType: SocialMediaType;
}
