import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Store } from "./models/store.model";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store) private storeModel: typeof Store) {}

  create(createStoreDto: CreateStoreDto) {
    return this.storeModel.create(createStoreDto);
  }

  findAll(): Promise<Store[]> {
    return this.storeModel.findAll();
  }

  findOne(id: number): Promise<Store | null> {
    return this.storeModel.findByPk(id);
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto
  ): Promise<Store | null> {
    const updated = await this.storeModel.update(updateStoreDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.storeModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "o'chira olmasen nima qilasan boshi qotirib a.";
  }
}
