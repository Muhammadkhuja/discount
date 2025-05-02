import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotUpadte } from './bot.update';

@Module({
  controllers: [],
  providers: [BotsService, BotUpadte],
})
export class BotsModule {}
