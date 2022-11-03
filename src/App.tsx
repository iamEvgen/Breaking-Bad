import React, { useState } from 'react';
import './App.css';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';
import { AppContextInterface, Episode } from './interfaces';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material';
import { yellow } from '@mui/material/colors';

export const AppContext = React.createContext<AppContextInterface | null>(null);

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
  },
});

export default function App() {
  const [showTable, setShowTable] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const queryClient = new QueryClient();

  function toggleShowTable() {
    setShowTable((prevShowTable) => !prevShowTable);
  }

  function modifyEpisodes(newArr: Episode[]) {
    setEpisodes(newArr);
  }

  return (
    <AppContext.Provider value={{ showTable, toggleShowTable, episodes, modifyEpisodes }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <FirstScreen />
            <SecondScreen />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
