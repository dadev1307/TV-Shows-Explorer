import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { TvmazeClient } from './tvmaze.client';

@Module({
  controllers: [ShowsController],
  providers: [ShowsService, TvmazeClient],
})
export class ShowsModule {}