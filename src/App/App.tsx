import styles from './App.module.css';
import { GenreFilter } from './GenreFilter/GenreFilter.tsx';
import { Pagination } from './Pagination/Pagination.tsx';
import { SearchBar } from './SearchBar/SearchBar.tsx';
import { ShowList } from './ShowList/ShowList.tsx';
import { usePresenter } from './usePresenter.ts';

function App() {
  const {
    searchBar,
    genreFilter,
    showList,
    pagination,
    error,
    stats,
    hasSearched,
    isEmpty,
  } = usePresenter();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.heading}>TV Shows Explorer</h1>
        <p className={styles.subtitle}>
          Поиск сериалов через TVmaze — введите запрос, отфильтруйте по жанру и
          листайте страницы.
        </p>
      </header>

      <SearchBar {...searchBar} />

      {error.message ? (
        <div className={styles.status} role="alert">
          <p className={styles.errorText}>{error.message}</p>
          <button
            type="button"
            className={styles.retryButton}
            onClick={error.onRetry}
          >
            Повторить
          </button>
        </div>
      ) : null}

      {hasSearched && !error.message ? (
        <p className={styles.stats}>
          Показано {stats.filteredCount} из {stats.totalCount} найденных
        </p>
      ) : null}

      <GenreFilter {...genreFilter} />

      {isEmpty ? (
        <p className={styles.empty}>По вашему запросу ничего не найдено.</p>
      ) : null}

      {!isEmpty && showList.shows.length > 0 ? (
        <>
          <ShowList {...showList} />
          <Pagination {...pagination} />
        </>
      ) : null}

      {!hasSearched ? (
        <p className={styles.hint}>
          Начните с поискового запроса — список пока пуст.
        </p>
      ) : null}
    </div>
  );
}

export default App;
