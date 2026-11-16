import { Controller, Get, Query } from '@nestjs/common';
import { SearchShowsDto } from './dto/search-shows.dto';
import { ShowsService } from './shows.service';
import type { ShowsPage } from './shows.types';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  search(@Query() dto: SearchShowsDto): Promise<ShowsPage> {
    return this.showsService.search(dto);
  }
}