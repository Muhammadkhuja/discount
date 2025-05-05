import {
  Controller,
  Get,
  Post,
  Body,
} from "@nestjs/common";
import { FavouriteService } from "./favourites.service";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";

@Controller("favourites")
export class FavouritesController {
  constructor(private readonly favouritesService: FavouriteService) {}

  @Post()
  create(@Body() createFavouriteDto: CreateFavouriteDto) {
    return this.favouritesService.create(createFavouriteDto);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
