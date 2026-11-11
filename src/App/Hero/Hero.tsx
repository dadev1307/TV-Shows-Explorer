import { BlockCursor, PromptLine } from '../components/index.ts';
import styles from './Hero.module.css';

export const Hero = () => (
  <header className={styles.hero}>
    <PromptLine command="whoami --full" />
    <h1 className={styles.name}>
      TV Shows Explorer
      <BlockCursor />
    </h1>
    <p className={styles.role}>
      <span className={styles.caret}>&gt;</span> Поиск сериалов через TVmaze
    </p>
    <p className={styles.intro}>
      Введите <strong>запрос</strong>, отфильтруйте выдачу по{' '}
      <strong>жанру</strong> и листайте страницы. Всё работает прямо в консоли
      вашего браузера.
    </p>
    <ul className={styles.checks}>
      <li>[x] источник: api.tvmaze.com</li>
      <li>[x] поиск с debounce 300ms</li>
      <li>[x] фильтр по жанрам</li>
    </ul>
    <div className={styles.actions}>
      <a className={styles.primary} href="#search">
        $ search --query -&gt;
      </a>
      <a className={styles.ghost} href="#results">
        ./results --list
      </a>
    </div>
  </header>
);
