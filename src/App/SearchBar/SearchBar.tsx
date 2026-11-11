import type { SearchBarProps } from './types.ts';
import styles from './SearchBar.module.css';

export const SearchBar = ({ query, onQueryChange, isLoading }: SearchBarProps) => (
  <div className={styles.wrapper}>
    <label className={styles.label} htmlFor="show-search">
      Поиск сериалов
    </label>
    <div className={styles.field}>
      <input
        id="show-search"
        className={styles.input}
        type="search"
        placeholder="Например, murder, banana, breaking…"
        value={query}
        onChange={(event) => {
          onQueryChange(event.target.value);
        }}
        autoComplete="off"
        spellCheck={false}
      />
      {isLoading ? <span className={styles.spinner} aria-hidden /> : null}
    </div>
  </div>
);
