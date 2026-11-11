import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { searchShows } from './api.ts';
import type { Show } from './types.ts';
import { withDebounce } from '../utils/withDebounce.ts';

const PAGE_SIZE = 3;

export const usePresenter = () => {
  const [query, setQuery] = useState('');

  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);

  const runSearch = useCallback((rawValue: string) => {
    const text = rawValue.trim();

    controller.current?.abort();
    setShows([]);
    setErrorMessage(null);
    setIsLoading(text !== '');

    if (!text) {
      return;
    }

    controller.current = new AbortController();
    searchShows(text, controller.current.signal)
      .then(setShows)
      .catch((err) => {
        if (controller.current?.signal.aborted) {
          return;
        }
        setErrorMessage(
          err instanceof Error ? err.message : 'Не удалось загрузить результаты'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const debouncedSearch = useMemo(() => withDebounce(runSearch), [runSearch]);

  const genres = [...new Set(shows.flatMap((show) => show.genres))].sort();
  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre))
    : shows;
  const totalPages = Math.max(1, Math.ceil(filteredShows.length / PAGE_SIZE));
  const pageShows = filteredShows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const hasSearched = query !== '';

  return {
    searchBar: {
      query,
      onQueryChange: (value: string) => {
        setQuery(value);
        setSelectedGenre(null);
        setPage(1);
        debouncedSearch(value);
      },
      isLoading,
    },
    genreFilter: {
      genres,
      selectedGenre,
      onGenreSelect: (genre: string | null) => {
        setSelectedGenre(genre === selectedGenre ? null : genre);
        setPage(1);
      },
    },
    showList: {
      shows: pageShows,
    },
    pagination: {
      page,
      totalPages,
      onPageChange: setPage,
    },
    error: {
      message: errorMessage,
      onRetry: () => {
        runSearch(query);
      },
    },
    stats: {
      filteredCount: filteredShows.length,
      totalCount: shows.length,
    },
    hasSearched,
    isEmpty:
      hasSearched && !isLoading && !errorMessage && filteredShows.length === 0,
  };
};
