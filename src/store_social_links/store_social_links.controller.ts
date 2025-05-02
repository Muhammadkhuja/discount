import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStoreSocialLinkDto } from './dto/create-store_social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store_social_link.dto';
import { StoreSocialLinkService } from './store_social_links.service';

@Controller("store-social-links")
export class StoreSocialLinksController {
  constructor(
    private readonly storeSocialLinksService: StoreSocialLinkService
  ) {}

  @Post()
  create(@Body() createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinksService.create(createStoreSocialLinkDto);
  }

  @Get()
  findAll() {
    return this.storeSocialLinksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storeSocialLinksService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStoreSocialLinkDto: UpdateStoreSocialLinkDto
  ) {
    return this.storeSocialLinksService.update(+id, updateStoreSocialLinkDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storeSocialLinksService.remove(+id);
  }
}
