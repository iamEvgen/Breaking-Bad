import React, { useContext } from 'react';
import { AppContext } from '../App';
import './FirstScreen.scss';
import classnames from 'classnames';
import useEpisodes from '../hooks/useEpisodes';
import { Typography, Button } from '@mui/material';

function FirstScreen() {
  const currentContext = useContext(AppContext);

  const { refetch } = useEpisodes();

  return (
    <div className={classnames('firstScreen', { firstScreen_hide: currentContext?.showTable })}>
      <Typography sx={{ mt: '20px' }} variant="h2" component="h1">
        Breaking Bad
      </Typography>
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
