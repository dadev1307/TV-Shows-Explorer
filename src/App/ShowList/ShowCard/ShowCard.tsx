import type { ShowCardProps } from './types.ts';
import styles from './ShowCard.module.css';

const stripHtml = (html: string | null): string => {
  if (!html) {
    return 'Описание отсутствует';
  }
  return html.replaceAll(/<[^>]*>/g, '').trim();
};

export const ShowCard = ({ show }: ShowCardProps) => {
  const rating = show.rating.average;
  const summary = stripHtml(show.summary);
  const posterUrl = show.image?.medium;

  return (
    <article className={styles.card}>
      <a
        className={styles.posterLink}
        href={show.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {posterUrl ? (
          <img
            className={styles.poster}
            src={posterUrl}
            alt={`Постер ${show.name}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.posterPlaceholder} aria-hidden>
            TV
          </div>
        )}
      </a>
      <div className={styles.body}>
        <h2 className={styles.title}>
          <a href={show.url} target="_blank" rel="noreferrer noopener">
            {show.name}
          </a>
        </h2>
        <div className={styles.meta}>
          {rating !== null ? (
            <span className={styles.rating}>★ {rating.toFixed(1)}</span>
          ) : (
            <span className={styles.rating}>Рейтинг N/A</span>
          )}
          {show.premiered ? (
            <span className={styles.premiered}>
              С {show.premiered.slice(0, 4)}
            </span>
          ) : null}
        </div>
        {show.genres.length > 0 ? (
          <ul className={styles.genres}>
            {show.genres.map((genre) => (
              <li key={genre} className={styles.genre}>
                {genre}
              </li>
            ))}
          </ul>
        ) : null}
        <p className={styles.summary}>{summary}</p>
      </div>
    </article>
  );
};
