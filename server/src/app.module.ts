import { Module } from '@nestjs/common';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [ShowsModule],
})
export class AppModule {}