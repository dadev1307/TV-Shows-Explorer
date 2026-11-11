import type { TerminalWindowProps } from './types.ts';
import styles from './TerminalWindow.module.css';

export const TerminalWindow = ({ statusLabel, children }: TerminalWindowProps) => (
  <div className={styles.window}>
    <div className={styles.titleBar}>
      <span className={styles.dots} aria-hidden>
        <span className={styles.dotRed} />
        <span className={styles.dotAmber} />
        <span className={styles.dotGreen} />
      </span>
      <span className={styles.path}>
        <span className={styles.user}>tv</span>@tvmaze:{' '}
        <span className={styles.user}>~/shows</span>
      </span>
      <nav className={styles.nav} aria-label="Разделы страницы">
        <a className={styles.navLink} href="#search">
          ~/search
        </a>
        <a className={styles.navLink} href="#results">
          ~/results
        </a>
      </nav>
      <span className={styles.status} role="status">
        <span className={styles.statusDot} aria-hidden />
        {statusLabel}
      </span>
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
