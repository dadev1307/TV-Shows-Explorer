import styles from './App.module.css';
import { PromptLine } from './components/index.ts';
import { CrtOverlay } from './CrtOverlay/CrtOverlay.tsx';
import { Footer } from './Footer/Footer.tsx';
import { GenreFilter } from './GenreFilter/GenreFilter.tsx';
import { Hero } from './Hero/Hero.tsx';
import { Neofetch } from './Neofetch/Neofetch.tsx';
import { Pagination } from './Pagination/Pagination.tsx';
import { SearchBar } from './SearchBar/SearchBar.tsx';
import { ShowList } from './ShowList/ShowList.tsx';
import { TerminalWindow } from './TerminalWindow/TerminalWindow.tsx';
import { usePresenter } from './usePresenter.ts';

function App() {
  const {
    terminal,
    searchBar,
    genreFilter,
    showList,
    pagination,
    error,
    neofetch,
    resultsComment,
    hasSearched,
    isEmpty,
  } = usePresenter();

  return (
    <div className={styles.app}>
      <CrtOverlay />
      <TerminalWindow {...terminal}>
        <Hero />

        <hr className={styles.rule} />

        <SearchBar {...searchBar} />

        {hasSearched ? <Neofetch {...neofetch} /> : null}

        <GenreFilter {...genreFilter} />

        <section id="results" className={styles.results}>
          <PromptLine command="ls -la ~/shows" comment={resultsComment} />

          {error.message ? (
            <div className={styles.status} role="alert">
              <p className={styles.errorText}>error: {error.message}</p>
              <button
                type="button"
                className={styles.retryButton}
                onClick={error.onRetry}
              >
                $ retry
              </button>
            </div>
          ) : null}

          {isEmpty ? (
            <p className={styles.empty}>
              ls: по вашему запросу ничего не найдено
            </p>
          ) : null}

          {!isEmpty && showList.shows.length > 0 ? (
            <>
              <ShowList {...showList} />
              <Pagination {...pagination} />
            </>
          ) : null}

          {!hasSearched ? (
            <p className={styles.hint}>
              total 0 — начните с поискового запроса, список пока пуст.
            </p>
          ) : null}
        </section>

        <Footer />
      </TerminalWindow>
    </div>
  );
}

export default App;
