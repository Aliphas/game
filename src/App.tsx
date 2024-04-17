import './App.css';
import StartMenu from './startMenu/StartMenu';
import { useAppSelector } from './redux/reduxHooks';
import { selectPage } from './features/start/gameSlice';
import Settings from './startMenu/Settings';
import About from './startMenu/About';
import GameWrapper from './game/GameWrapper';

function App() {
  const page: string = useAppSelector(selectPage)

  const renderSwitchPage: () => JSX.Element = () => {
    switch (page) {
      case "start":
        return <StartMenu />
      case "settings":
        return <Settings />
      case "about":
        return <About />
      case "game":
        return <GameWrapper />
      default:
        return <StartMenu />
    }
  }

  return (
    <div className="App">
      {renderSwitchPage()}
    </div>
  );
}

export default App;
