import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./models/media.model";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaModel: typeof Media) {}

  create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto);
  }

  findAll(): Promise<Media[]> {
    return this.mediaModel.findAll();
  }

  findOne(id: number): Promise<Media | null> {
    return this.mediaModel.findByPk(id);
  }

  async update(
    id: number,
    updateMediaDto: UpdateMediaDto
  ): Promise<Media | null> {
    const updated = await this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.mediaModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "o'chira olmasen nima qilasan boshi qotirib a.";
  }
}
