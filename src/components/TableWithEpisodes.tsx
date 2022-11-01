import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './TableWithEpisodes.module.scss';
import classnames from 'classnames';
import { Episode } from '../interfaces';

export default function TableWithEpisodes() {
  const currentContext = useContext(AppContext);

  function addChar(episode_id: number): void {
    const Episodes = JSON.parse(JSON.stringify(currentContext?.episodes));
    const updatedEpisodes = Episodes.map((episode: Episode) => {
      if (episode.episode_id === episode_id && episode.characters.length < 99) {
        episode.characters.push('fakeСharacter');
      }
      return episode;
    });
    currentContext?.modifyEpisodes(updatedEpisodes);
  }

  function removeChar(episode_id: number): void {
    const Episodes = JSON.parse(JSON.stringify(currentContext?.episodes));
    const updatedEpisodes = Episodes.map((episode: Episode) => {
      if (episode.episode_id === episode_id && episode.characters.length > 0) {
        episode.characters.pop();
      }
      return episode;
    });
    currentContext?.modifyEpisodes(updatedEpisodes);
  }

  function delEpisode(episode_id: number): void {
    const Episodes = JSON.parse(JSON.stringify(currentContext?.episodes));
    const updatedEpisodes = Episodes.filter((episode: Episode) => episode.episode_id !== episode_id);
    currentContext?.modifyEpisodes(updatedEpisodes);
    if (updatedEpisodes.length === 0) {
      currentContext?.toggleShowTable();
    }
  }

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
        <td className={styles.tableWithEpisodes__td}>{episode.episode_id}</td>
        <td className={styles.tableWithEpisodes__td}>{episode.title}</td>
        <td className={styles.tableWithEpisodes__td}>{episode.season}</td>
        <td className={styles.tableWithEpisodes__td}>{episode.air_date}</td>
        <td className={styles.tableWithEpisodes__charAndButtons}>
          <span className={styles.tableWithEpisodes__charText}>
            {episode.characters.length + ' персонаж' + wordEnding}
          </span>
          <div className={styles.tableWithEpisodes__charButtons}>
            <button onClick={() => addChar(episode.episode_id)} className={styles.tableWithEpisodes__charButton}>
              +
            </button>
            <button
              onClick={() => removeChar(episode.episode_id)}
              className={classnames(styles.tableWithEpisodes__charButton, styles.tableWithEpisodes__minusButton)}
            >
              –
            </button>
            <button
              onClick={() => delEpisode(episode.episode_id)}
              className={classnames(styles.tableWithEpisodes__charButton, styles.tableWithEpisodes__delButton)}
            >
              x
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table className={styles.tableWithEpisodes}>
      <thead>
        <tr className={styles.tableWithEpisodes__rowTitle}>
          <th className={styles.tableWithEpisodes__headerInTable}>Номер</th>
          <th className={styles.tableWithEpisodes__headerInTable}>Название</th>
          <th className={styles.tableWithEpisodes__headerInTable}>Сезон</th>
          <th className={styles.tableWithEpisodes__headerInTable}>Дата выхода</th>
          <th className={styles.tableWithEpisodes__headerInTable}>Количество персонажей</th>
        </tr>
      </thead>
      <tbody>{allEpisodes}</tbody>
    </table>
  );
}
