import { PromptLine } from '../components/index.ts';
import type { SearchBarProps } from './types.ts';
import styles from './SearchBar.module.css';

export const SearchBar = ({ query, onQueryChange, isLoading }: SearchBarProps) => (
  <section id="search" className={styles.wrapper}>
    <PromptLine command="search --query" comment="debounce 300ms" />
    <label className={styles.label} htmlFor="show-search">
      &gt; поиск сериалов
    </label>
    <div className={styles.field}>
      <span className={styles.prompt} aria-hidden>
        $
      </span>
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
  </section>
);
