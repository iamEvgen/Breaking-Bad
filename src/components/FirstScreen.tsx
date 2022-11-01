import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './FirstScreen.module.scss';
import classnames from 'classnames';

function FirstScreen() {
  const currentContext = useContext(AppContext);
  return (
    <div className={classnames({ [styles.firstScreen]: true, [styles.firstScreen_hide]: currentContext!.showTable })}>
      <h1 className={styles.firstScreen__title}>Breaking Bad</h1>
      <button onClick={currentContext!.toggleShowTable} className={styles.firstScreen__button}>
        Загрузить Эпизоды
      </button>
    </div>
  );
}

export default FirstScreen;
