import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { StoreSubscribe } from "./models/store_subscribe.model";
import { CreateStoreSubscribeDto } from "./dto/create-store_subscribe.dto";

@Injectable()
export class StoreSubscribesService {
  constructor(
    @InjectModel(StoreSubscribe)
    private storeSubscribeModel: typeof StoreSubscribe
  ) {}

  create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return this.storeSubscribeModel.create(createStoreSubscribeDto);
  }

  findAll(): Promise<StoreSubscribe[]> {
    return this.storeSubscribeModel.findAll();
  }

  // findOne(userId: number, storeId: number): Promise<StoreSubscribe | null> {
  //   return this.storeSubscribeModel.findOne({
  //     where: { userId, storeId },
  //   });
  // }

  // async remove(userId: number, storeId: number) {
  //   const deleted = await this.storeSubscribeModel.destroy({
  //     where: { userId, storeId },
  //   });
  //   if (deleted > 0) return "endi yoq";
  //   return "o'chira olmasen nima qilasan boshi qotirib a.";
  // }
}
