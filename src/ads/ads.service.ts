import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ads } from "./models/ad.model";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads) private adsModel: typeof Ads) {}

  create(createAdsDto: CreateAdDto) {
    return this.adsModel.create(createAdsDto);
  }

  findAll(): Promise<Ads[]> {
    return this.adsModel.findAll();
  }

  findOne(id: number): Promise<Ads | null> {
    return this.adsModel.findByPk(id);
  }

  async update(id: number, updateAdsDto: UpdateAdDto): Promise<Ads | null> {
    const updated = await this.adsModel.update(updateAdsDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.adsModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "o'chira olmasen nima qilasan boshi qotirib a.";
  }
}
