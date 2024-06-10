import './App.css';
import StartMenu from './startMenu/StartMenu';
import { useAppSelector } from './redux/reduxHooks';
import { selectIsGame, selectPage } from './features/start/gameSlice';
import GameWrapper from './game/GameWrapper';
import StartLobbyWrapper from './startLobby/StartLobbyWrapper';
import SettingsWrapper from './startMenu/settings/SettingsWrapper';
import AboutWrapper from './startMenu/about/AboutWrapper';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const page: string = useAppSelector(selectPage)
  const isGame: boolean = useAppSelector(selectIsGame)

  const renderSwitchPage = () => {
    switch (page) {
      case "create":
        return <StartLobbyWrapper />
      case "start":
        return <StartMenu isGame={isGame} />
      case "settings":
        return <SettingsWrapper />
      case "about":
        return <AboutWrapper />
      case "game":
        return <GameWrapper />
      default:
        return <StartMenu isGame={isGame} />
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {renderSwitchPage()}
      </ThemeProvider>

    </div>
  );
}

const theme = createTheme({
  spacing: 5,
  palette: {
    primary: {
      main: '#f7912b',
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input": {
            backgroundColor: "white",
            height: "35px",
            padding: "0",
            borderRadius: "5px"

          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#07912b"
          }
        }
      }
    }
  }
})

export default App;
