import React, { useState } from 'react';
import './App.css';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';

interface Episode {
  episode_id: number;
  title: string;
  season: number;
  air_date: string;
  characters: string[];
  episode: number;
  series: string;
}
interface AppContextInterface {
  showTable: boolean;
  toggleShowTable: () => void;
  episodes: Episode[];
  modifyEpisodes: (newArr: Episode[]) => void;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export default function App() {
  const [showTable, setShowTable] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  function toggleShowTable() {
    setShowTable((prevShowTable) => !prevShowTable);
  }

  function modifyEpisodes(newArr: Episode[]) {
    setEpisodes(newArr);
  }

  return (
    <AppContext.Provider value={{ showTable, toggleShowTable, episodes, modifyEpisodes }}>
      <div className="App">
        <FirstScreen />
        <SecondScreen />
      </div>
    </AppContext.Provider>
  );
}
