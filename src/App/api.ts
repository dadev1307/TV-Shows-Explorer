import type { SearchShowsParams, ShowsPage } from './types.ts';

const PAGE_SIZE = 3;

export const searchShows = async (
  params: SearchShowsParams,
  signal: AbortSignal,
): Promise<ShowsPage> => {
  const searchParams = new URLSearchParams({
    q: params.query,
    page: String(params.page),
    limit: String(params.limit),
  });

  if (params.genre) {
    searchParams.set('genre', params.genre);
  }

  const response = await fetch(`/api/shows?${searchParams}`, { signal });

  if (!response.ok) {
    const message =
      response.status === 502
        ? 'Сервис TVmaze временно недоступен'
        : `Ошибка сервера: ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<ShowsPage>;
};

export const DEFAULT_PAGE_SIZE = PAGE_SIZE;