import React, { useContext } from 'react';
import { AppContext } from '../App';
import './SecondScreen.scss';
import classnames from 'classnames';
import TableWithEpisodes from './TableWithEpisodes';
import { Episode } from '../interfaces';
import loading from '../img/loading.gif';
import useEpisodes from '../hooks/useEpisodes';
import { Button, Typography, Container, Box, ImageList, ImageListItem } from '@mui/material';

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
    <div className={classnames('secondScreen', { secondScreen_show: currentContext?.showTable })}>
      <Container sx={{ maxWidth: 'lg', mt: '20px', mb: '20px' }}>
        <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
          <Typography component="h1" variant="h3" sx={{ mb: '20px' }}>
            {'Все эпизоды сериала "Во все тяжкие"'}
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Typography component="h2" variant="h4">
              Сортировка:
            </Typography>
            <Button variant="contained" onClick={sortById}>
              По номеру эпизода
            </Button>
            <Button variant="contained" onClick={sortByCharsQuantity}>
              По количеству персонажей
            </Button>
            <Button color="error" variant="contained" onClick={clearStateEpisodes}>
              Удалить все эпизоды
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isSuccess && <TableWithEpisodes />}
            {isFetching && (
              <ImageList sx={{ width: '80px', mt: '20px' }}>
                <ImageListItem>
                  <img src={loading} alt="loading..." />
                </ImageListItem>
              </ImageList>
            )}
            {isError && (
              <Typography sx={{ color: 'red', margin: '20px' }} component="p">
                Произошла ошибка при загрузке данных по API
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
