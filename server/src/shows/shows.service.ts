import { Injectable, Logger } from '@nestjs/common';
import type { SearchShowsDto } from './dto/search-shows.dto';
import type { Show, ShowsPage } from './shows.types';
import { TtlCache } from './ttl-cache';
import { TvmazeClient } from './tvmaze.client';

const collectGenres = (shows: Show[]): string[] =>
  [...new Set(shows.flatMap((show) => show.genres))].sort();

@Injectable()
export class ShowsService {
  private readonly logger = new Logger(ShowsService.name);
  private readonly cache = new TtlCache<Show[]>();
  private readonly inFlight = new Map<string, Promise<Show[]>>();

  constructor(private readonly tvmaze: TvmazeClient) {}

  async search(dto: SearchShowsDto): Promise<ShowsPage> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 3;
    const allShows = await this.getShowsForQuery(dto.q);

    const totalFound = allShows.length;
    const genres = collectGenres(allShows);

    const filtered = dto.genre
      ? allShows.filter((show) => show.genres.includes(dto.genre!))
      : allShows;

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return {
      items,
      page: safePage,
      limit,
      totalItems,
      totalPages,
      totalFound,
      genres,
    };
  }

  private async getShowsForQuery(query: string): Promise<Show[]> {
    const key = query.trim().toLowerCase();
    const cached = this.cache.get(key);
    if (cached) {
      this.logger.debug(`Cache hit for "${key}"`);
      return cached;
    }

    let pending = this.inFlight.get(key);
    if (!pending) {
      this.logger.debug(`Fetching TVmaze for "${key}"`);
      pending = this.tvmaze.searchShows(query).then((shows) => {
        this.cache.set(key, shows);
        this.inFlight.delete(key);
        return shows;
      }).catch((error: unknown) => {
        this.inFlight.delete(key);
        throw error;
      });
      this.inFlight.set(key, pending);
    }

    return pending;
  }
}