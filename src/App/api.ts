import type { Show } from './types.ts';

const cache = new Map<string, Show[]>();

export const searchShows = async (
  query: string,
  signal: AbortSignal
): Promise<Show[]> => {
  const key = query.toLowerCase();
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`TVmaze API error: ${response.status}`);
  }

  const items: { show: Show }[] = await response.json();
  const shows = items.map((item) => item.show);
  cache.set(key, shows);
  return shows;
};
