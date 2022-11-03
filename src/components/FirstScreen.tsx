import React, { useContext } from 'react';
import { AppContext } from '../App';
import styles from './FirstScreen.module.scss';
import classnames from 'classnames';
import useEpisodes from '../hooks/useEpisodes';
import { Button } from '@mui/material';

function FirstScreen() {
  const currentContext = useContext(AppContext);

  const { refetch } = useEpisodes();

  return (
    <div className={classnames({ [styles.firstScreen]: true, [styles.firstScreen_hide]: currentContext?.showTable })}>
      <h1 className={styles.firstScreen__title}>Breaking Bad</h1>
      <Button
        sx={{ mb: '20px' }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          currentContext?.toggleShowTable();
          refetch();
        }}
      >
        Загрузить эпизоды
      </Button>
    </div>
  );
}

export default FirstScreen;
