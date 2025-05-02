import { Module } from '@nestjs/common';
import { StoreSocialLinksController } from './store_social_links.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store_social_link.model';
import { StoreSocialLinkService } from './store_social_links.service';

@Module({
  imports: [SequelizeModule.forFeature([StoreSocialLink])],
  controllers: [StoreSocialLinksController],
  providers: [StoreSocialLinkService],
})
export class StoreSocialLinksModule {}
