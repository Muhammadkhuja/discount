import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./models/district.model";

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtModel: typeof District) {}

  create(createDistrictDto: CreateDistrictDto):Promise<District> {
    return this.districtModel.create(createDistrictDto);
  }

  findAll(): Promise<District[]> {
    return this.districtModel.findAll();
  }

  findOne(id: number): Promise<District | null> {
    return this.districtModel.findByPk(id);
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto
  ): Promise<District | null> {
    const updatedDistrict = await this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return updatedDistrict[1][0];
  }

  async remove(id: number) {
    const deleted = await this.districtModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "yo bob ketfi krch";
    }
    return "aqlin yetmayapdi ku .";
  }
}
