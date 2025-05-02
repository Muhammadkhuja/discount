import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { StoreSocialLink } from "./models/store_social_link.model";
import { CreateStoreSocialLinkDto } from "./dto/create-store_social_link.dto";
import { UpdateStoreSocialLinkDto } from "./dto/update-store_social_link.dto";

@Injectable()
export class StoreSocialLinkService {
  constructor(
    @InjectModel(StoreSocialLink)
    private storeSocialLinkModel: typeof StoreSocialLink
  ) {}

  create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinkModel.create(createStoreSocialLinkDto);
  }

  findAll(): Promise<StoreSocialLink[]> {
    return this.storeSocialLinkModel.findAll();
  }

  findOne(id: number): Promise<StoreSocialLink | null> {
    return this.storeSocialLinkModel.findByPk(id);
  }

  async update(
    id: number,
    updateStoreSocialLinkDto: UpdateStoreSocialLinkDto
  ): Promise<StoreSocialLink | null> {
    const updated = await this.storeSocialLinkModel.update(
      updateStoreSocialLinkDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.storeSocialLinkModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "o'chira olmasen nima qilasan boshi qotirib a.";
  }
}
