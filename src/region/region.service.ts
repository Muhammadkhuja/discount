import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionModel: typeof Region) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionModel.create(createRegionDto);
  }

  findAll(): Promise<Region[]> {
    return this.regionModel.findAll();
  }

  findOne(id: number): Promise<Region | null> {
    return this.regionModel.findByPk(id);
  }

  async update(
    id: number,
    updateRegionDto: UpdateRegionDto
  ): Promise<Region | null> {
    const updateRegion = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return updateRegion[1][0];
  }

  async remove(id: number) {
    const removeregion = await this.regionModel.destroy({ where: { id } });
    if (removeregion > 0) {
      return `Yo bob kedi krch`;
    }
    return "aqlin yetmasa nega o'chirasan a";
  }
}
