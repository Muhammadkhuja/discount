import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMediaType } from "./models/social_media_type.model";
import { CreateSocialMediaTypeDto } from "./dto/create-social_media_type.dto";
import { UpdateSocialMediaTypeDto } from "./dto/update-social_media_type.dto";

@Injectable()
export class SocialMediaTypeService {
  constructor(
    @InjectModel(SocialMediaType)
    private socialMediaTypeModel: typeof SocialMediaType
  ) {}

  create(createDto: CreateSocialMediaTypeDto) {
    return this.socialMediaTypeModel.create(createDto);
  }

  findAll(): Promise<SocialMediaType[]> {
    return this.socialMediaTypeModel.findAll();
  }

  findOne(id: number): Promise<SocialMediaType | null> {
    return this.socialMediaTypeModel.findByPk(id);
  }

  async update(
    id: number,
    updateDto: UpdateSocialMediaTypeDto
  ): Promise<SocialMediaType | null> {
    const updated = await this.socialMediaTypeModel.update(updateDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.socialMediaTypeModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "ochira olmasen nima qilasan boshi qotirib a.";
  }
}
