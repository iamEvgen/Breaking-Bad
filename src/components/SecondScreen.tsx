import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './SecondScreen.module.scss';
import classnames from 'classnames';
import TableWithEpisodes from './TableWithEpisodes';

export default function SecondScreen() {
  const currentContext = useContext(AppContext);

  return (
    <div className={classnames(styles.secondScreen, { [styles.secondScreen_show]: currentContext?.showTable })}>
      <main className={styles.secondScreen__container}>
        <h1 className={styles.secondScreen__title}>Все эпизоды сериала Во все тяжкие</h1>
        <div className={styles.secondScreen__sort}>
          <h2 className={styles.secondScreen__h2}>Сортировка:</h2>
          <button className={styles.secondScreen__button}>По номеру эпизода</button>{' '}
          <button className={styles.secondScreen__button}>По количеству персонажей</button>
          <button className={classnames(styles.secondScreen__button, styles.secondScreen__buttonDelete)}>
            Удалить все эпизоды
          </button>
        </div>
        <TableWithEpisodes />
      </main>
    </div>
  );
}
