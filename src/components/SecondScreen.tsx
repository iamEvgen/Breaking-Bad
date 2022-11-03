import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './SecondScreen.module.scss';
import classnames from 'classnames';
import TableWithEpisodes from './TableWithEpisodes';
import { Episode } from '../interfaces';
import loading from '../img/loading.gif';
import useEpisodes from '../hooks/useEpisodes';

export default function SecondScreen() {
  const currentContext = useContext(AppContext);

  const { isError, isFetching, isSuccess } = useEpisodes();

  function sortById() {
    const Episodes = JSON.parse(JSON.stringify(currentContext?.episodes));
    const updatedEpisodes = Episodes.sort((a: Episode, b: Episode) => a.episode_id - b.episode_id);
    currentContext?.modifyEpisodes(updatedEpisodes);
  }

  function sortByCharsQuantity() {
    const Episodes = JSON.parse(JSON.stringify(currentContext?.episodes));
    const updatedEpisodes = Episodes.sort((a: Episode, b: Episode) => a.characters.length - b.characters.length);
    currentContext?.modifyEpisodes(updatedEpisodes);
  }

  function clearStateEpisodes() {
    currentContext?.modifyEpisodes([]);
    currentContext?.toggleShowTable();
  }

  return (
    <div className={classnames(styles.secondScreen, { [styles.secondScreen_show]: currentContext?.showTable })}>
      <main className={styles.secondScreen__container}>
        <h1 className={styles.secondScreen__title}>Все эпизоды сериала Во все тяжкие</h1>
        <div className={styles.secondScreen__sort}>
          <h2 className={styles.secondScreen__h2}>Сортировка:</h2>
          <button onClick={sortById} className={styles.secondScreen__button}>
            По номеру эпизода
          </button>{' '}
          <button onClick={sortByCharsQuantity} className={styles.secondScreen__button}>
            По количеству персонажей
          </button>
          <button
            onClick={clearStateEpisodes}
            className={classnames(styles.secondScreen__button, styles.secondScreen__buttonDelete)}
          >
            Удалить все эпизоды
          </button>
        </div>
        {isSuccess && <TableWithEpisodes />}
        {isFetching && <img className={styles.secondScreen__loading} src={loading} alt="loading..." />}
        {isError && <div className={styles.secondScreen__error}>Произошла ошибка при загрузке данных по API</div>}
      </main>
    </div>
  );
}
