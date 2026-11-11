import type { PaginationProps } from './types.ts';
import styles from './Pagination.module.css';

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.nav} aria-label="Пагинация результатов">
      <button
        type="button"
        className={styles.control}
        disabled={page <= 1}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        &lt; Назад
      </button>
      <ol className={styles.pages}>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              className={styles.page}
              data-active={pageNumber === page}
              aria-current={pageNumber === page ? 'page' : undefined}
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className={styles.control}
        disabled={page >= totalPages}
        onClick={() => {
          onPageChange(page + 1);
        }}
      >
        Вперёд &gt;
      </button>
    </nav>
  );
};
