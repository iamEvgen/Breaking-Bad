export interface Episode {
  episode_id: number;
  title: string;
  season: number;
  air_date: string;
  characters: string[];
  episode: number;
  series: string;
}

export interface AppContextInterface {
  showTable: boolean;
  toggleShowTable: () => void;
  episodes: Episode[];
  modifyEpisodes: (newArr: Episode[]) => void;
}
