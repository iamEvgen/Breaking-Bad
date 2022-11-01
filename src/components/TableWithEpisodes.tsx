import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './TableWithEpisodes.module.scss';

export default function TableWithEpisodes() {
  const currentContext = useContext(AppContext);

  const allEpisodes = currentContext?.episodes.map((episode) => {
    let wordEnding = 'ей';
    const numberOfCharecters = episode.characters.length.toString();
    if (numberOfCharecters.endsWith('1')) {
      wordEnding = '';
    }
    if (['2', '3', '4'].includes(numberOfCharecters.slice(-1))) {
      wordEnding = 'а';
    }
    if (+numberOfCharecters >= 5 && +numberOfCharecters <= 20) {
      wordEnding = 'ей';
    }
    return (
      <tr key={episode.episode_id}>
        <td>{episode.episode_id}</td>
        <td>{episode.title}</td>
        <td>{episode.season}</td>
        <td>{episode.air_date}</td>
        <td>
          {episode.characters.length + ' персонаж' + wordEnding}
          <button className={styles.tableWithEpisodes__button}>+</button>
          <button className={styles.tableWithEpisodes__button}>-</button>
          <button className={styles.tableWithEpisodes__button}>Del</button>
        </td>
      </tr>
    );
  });

  return (
    <table className={styles.tableWithEpisodes}>
      <thead>
        <tr className={styles.tableWithEpisodes__rowTitle}>
          <th className={styles.tableWithEpisodes__header}>Номер</th>
          <th className={styles.tableWithEpisodes__header}>Название</th>
          <th className={styles.tableWithEpisodes__header}>Сезон</th>
          <th className={styles.tableWithEpisodes__header}>Дата выхода</th>
          <th className={styles.tableWithEpisodes__header}>Количество персонажей</th>
        </tr>
      </thead>
      <tbody>{allEpisodes}</tbody>
    </table>
  );
}
