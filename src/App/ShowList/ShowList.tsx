import { ShowCard } from './ShowCard/ShowCard.tsx';
import type { ShowListProps } from './types.ts';
import styles from './ShowList.module.css';

export const ShowList = ({ shows }: ShowListProps) => (
  <ul className={styles.list}>
    {shows.map((show) => (
      <li key={show.id} className={styles.item}>
        <ShowCard show={show} />
      </li>
    ))}
  </ul>
);
