import { PromptLine } from '../components/index.ts';
import { AVATAR_ART } from './avatar.ts';
import type { NeofetchProps } from './types.ts';
import styles from './Neofetch.module.css';

export const Neofetch = ({ rows }: NeofetchProps) => (
  <section className={styles.section} aria-label="Сводка по выдаче">
    <PromptLine command="neofetch" />
    <div className={styles.card}>
      <div className={styles.avatarColumn}>
        <pre className={styles.avatar} aria-hidden>
          {AVATAR_ART}
        </pre>
        <span className={styles.avatarLabel}>tv@explorer</span>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>tv@tvmaze ----------</p>
        <dl className={styles.list}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt className={styles.key}>{row.label}:</dt>
              <dd
                className={styles.value}
                data-highlighted={row.isHighlighted === true}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.swatches} aria-hidden>
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
          <span className={styles.swatch} />
        </div>
      </div>
    </div>
  </section>
);
