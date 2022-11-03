import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Episode } from '../interfaces';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
      <TableRow key={episode.episode_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{episode.episode_id}</TableCell>
        <TableCell align="center">{episode.title}</TableCell>
        <TableCell align="center">{episode.season}</TableCell>
        <TableCell align="center">{episode.air_date}</TableCell>
        <TableCell align="right">
          {episode.characters.length + ' персонаж' + wordEnding}

          <Button sx={{ ml: '10px' }} size="small" variant="contained" onClick={() => addChar(episode.episode_id)}>
            +
          </Button>
          <Button sx={{ ml: '10px' }} onClick={() => removeChar(episode.episode_id)} size="small" variant="contained">
            -
          </Button>
          <Button
            sx={{ ml: '10px' }}
            color="error"
            onClick={() => delEpisode(episode.episode_id)}
            size="small"
            variant="contained"
          >
            Del
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer sx={{ mt: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 920 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Номер</TableCell>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Сезон</TableCell>
            <TableCell align="center">Дата выхода</TableCell>
            <TableCell align="center">Количество персонажей</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{allEpisodes}</TableBody>
      </Table>
    </TableContainer>
  );
}
