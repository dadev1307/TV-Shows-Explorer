import type { PromptLineProps } from './types.ts';
import styles from './PromptLine.module.css';

export const PromptLine = ({ command, comment }: PromptLineProps) => (
  <p className={styles.line}>
    <span className={styles.path}>tv~/shows $</span>
    <span className={styles.command}>{command}</span>
    {comment ? <span className={styles.comment}># {comment}</span> : null}
  </p>
);
