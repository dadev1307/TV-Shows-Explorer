import { BlockCursor } from '../components/index.ts';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.echo}>
      <span className={styles.prompt}>$</span> echo &quot;(c) 2026 TV Shows
      Explorer, данные TVmaze&quot;
      <BlockCursor />
    </p>
    <p className={styles.git}>
      source: api.tvmaze.com, main@a1f9e2c, uptime 99.98%
    </p>
  </footer>
);
