import { Module } from '@nestjs/common';
import { FavouriteService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favourite } from './models/favourite.model';

@Module({
  imports: [SequelizeModule.forFeature([Favourite])],
  controllers: [FavouritesController],
  providers: [FavouriteService],
})
export class FavouritesModule {}
