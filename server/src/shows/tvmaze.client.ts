import { BadGatewayException, Injectable } from '@nestjs/common';
import type { Show } from './shows.types';

type TvmazeSearchItem = {
  show: {
    id: number;
    name: string;
    genres: string[];
    image: { medium: string } | null;
    rating: { average: number | null };
    summary: string | null;
    premiered: string | null;
    url: string;
  };
};

@Injectable()
export class TvmazeClient {
  async searchShows(query: string): Promise<Show[]> {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

    let response: Response;
    try {
      response = await fetch(url);
    } catch {
      throw new BadGatewayException('TVmaze API is unreachable');
    }

    if (!response.ok) {
      throw new BadGatewayException(`TVmaze API error: ${response.status}`);
    }

    const items = (await response.json()) as TvmazeSearchItem[];

    return items.map(({ show }) => ({
      id: show.id,
      name: show.name,
      genres: show.genres,
      image: show.image,
      rating: show.rating,
      summary: show.summary,
      premiered: show.premiered,
      url: show.url,
    }));
  }
}
