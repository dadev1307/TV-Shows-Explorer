import type { ShowCardProps } from './types.ts';
import { usePresenter } from './usePresenter.ts';
import styles from './ShowCard.module.css';

export const ShowCard = ({ show }: ShowCardProps) => {
  const { summary, posterUrl, ratingLabel, ratingMeter, premieredYear } =
    usePresenter(show);

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          <a href={show.url} target="_blank" rel="noreferrer noopener">
            {show.name}
            <span className={styles.slash}>/</span>
          </a>
        </h2>
        <div className={styles.headMeta}>
          <span className={styles.rating}>★ {ratingLabel}</span>
          <span className={styles.permissions} aria-hidden>
            -rwxr-xr-x
          </span>
        </div>
      </div>

      <div className={styles.content}>
        <a
          className={styles.posterLink}
          href={show.url}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={-1}
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
          <p className={styles.summary}>{summary}</p>

          <ul className={styles.tags}>
            {premieredYear ? (
              <li className={styles.tagAmber}>с {premieredYear}</li>
            ) : null}
            {show.genres.map((genre) => (
              <li key={genre} className={styles.tag}>
                {genre}
              </li>
            ))}
          </ul>

          <p className={styles.meter} aria-hidden>
            <span className={styles.meterLabel}>rating</span>
            <span className={styles.meterBar}>{ratingMeter}</span>
          </p>

          <a
            className={styles.link}
            href={show.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className={styles.arrow} aria-hidden>
              →
            </span>{' '}
            открыть на TVmaze
          </a>
        </div>
      </div>
    </article>
  );
};
