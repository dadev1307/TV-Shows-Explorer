import { PromptLine } from '../components/index.ts';
import type { GenreFilterProps } from './types.ts';
import styles from './GenreFilter.module.css';

export const GenreFilter = ({
  genres,
  selectedGenre,
  onGenreSelect,
}: GenreFilterProps) => {
  if (genres.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <PromptLine command="grep --genre" comment={`${genres.length} доступно`} />
      <p className={styles.title}>&gt; жанры в выдаче</p>
      <div className={styles.list} role="group" aria-label="Фильтр по жанрам">
        <button
          type="button"
          className={styles.chip}
          data-active={selectedGenre === null}
          aria-pressed={selectedGenre === null}
          onClick={() => {
            onGenreSelect(null);
          }}
        >
          Все
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={styles.chip}
            data-active={selectedGenre === genre}
            aria-pressed={selectedGenre === genre}
            onClick={() => {
              onGenreSelect(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
};
