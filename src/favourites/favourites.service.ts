import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Favourite } from "./models/favourite.model";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite) private favouriteModel: typeof Favourite
  ) {}

  create(createFavouriteDto: CreateFavouriteDto) {
    return this.favouriteModel.create(createFavouriteDto);
  }

  findAll(): Promise<Favourite[]> {
    return this.favouriteModel.findAll();
  }
}
