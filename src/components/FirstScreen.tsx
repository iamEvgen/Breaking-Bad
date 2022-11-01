import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './FirstScreen.module.scss';
import classnames from 'classnames';
import axios from 'axios';

function FirstScreen() {
  const currentContext = useContext(AppContext);

  async function getEpisodes() {
    try {
      const response = await axios.get('https://breakingbadapi.com/api/episodes');
      currentContext?.modifyEpisodes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classnames({ [styles.firstScreen]: true, [styles.firstScreen_hide]: currentContext?.showTable })}>
      <h1 className={styles.firstScreen__title}>Breaking Bad</h1>
      <button
        onClick={() => {
          currentContext?.toggleShowTable();
          getEpisodes();
        }}
        className={styles.firstScreen__button}
      >
        Загрузить Эпизоды
      </button>
    </div>
  );
}

export default FirstScreen;
