import { useQuery } from 'react-query';
import { Episode } from '../interfaces';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function useEpisodes() {
  const currentContext = useContext(AppContext);

  return useQuery(
    'episodes',
    async (): Promise<Array<Episode>> => {
      const { data } = await axios.get('https://breakingbadapi.com/api/episodes');
      currentContext?.modifyEpisodes(data);
      return data;
    },
    { enabled: false }
  );
}
