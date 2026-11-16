import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE, searchShows } from './api.ts';
import type { Show } from './types.ts';
import { withDebounce } from '../utils/withDebounce.ts';

export const usePresenter = () => {
  const [query, setQuery] = useState('');

  const [shows, setShows] = useState<Show[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFound, setTotalFound] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);

  const runSearch = useCallback(
    (searchQuery: string, searchPage: number, genre: string | null) => {
      const text = searchQuery.trim();

      controller.current?.abort();
      setErrorMessage(null);
      setIsLoading(text !== '');

      if (!text) {
        setShows([]);
        setGenres([]);
        setTotalPages(1);
        setTotalFound(0);
        setFilteredCount(0);
        return;
      }

      controller.current = new AbortController();
      searchShows(
        {
          query: text,
          page: searchPage,
          limit: DEFAULT_PAGE_SIZE,
          genre,
        },
        controller.current.signal
      )
        .then((result) => {
          setShows(result.items);
          setGenres(result.genres);
          setPage(result.page);
          setTotalPages(result.totalPages);
          setTotalFound(result.totalFound);
          setFilteredCount(result.totalItems);
        })
        .catch((err) => {
          if (controller.current?.signal.aborted) {
            return;
          }
          if (err instanceof DOMException && err.name === 'AbortError') {
            return;
          }
          setErrorMessage(
            err instanceof Error
              ? err.message
              : 'Не удалось загрузить результаты'
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  const debouncedTextSearch = useMemo(
    () => withDebounce((value: string) => runSearch(value, 1, null)),
    [runSearch]
  );

  const hasSearched = query.trim() !== '';

  return {
    searchBar: {
      query,
      onQueryChange: (value: string) => {
        setQuery(value);
        setSelectedGenre(null);
        setPage(1);
        debouncedTextSearch(value);
      },
      isLoading,
    },
    genreFilter: {
      genres,
      selectedGenre,
      onGenreSelect: (genre: string | null) => {
        const nextGenre = genre === selectedGenre ? null : genre;
        setSelectedGenre(nextGenre);
        setPage(1);
        runSearch(query, 1, nextGenre);
      },
    },
    showList: {
      shows,
    },
    pagination: {
      page,
      totalPages,
      onPageChange: (nextPage: number) => {
        setPage(nextPage);
        runSearch(query, nextPage, selectedGenre);
      },
    },
    error: {
      message: errorMessage,
      onRetry: () => {
        runSearch(query, page, selectedGenre);
      },
    },
    stats: {
      filteredCount,
      totalCount: totalFound,
    },
    hasSearched,
    isEmpty: hasSearched && !isLoading && !errorMessage && filteredCount === 0,
  };
};
