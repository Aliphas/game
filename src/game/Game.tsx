import styles from "./game.module.css"
import MapWrapper from "../map/MapWrapper";
import RightBarWrapper from "../rightBar/RightBarWrapper";
import LeftBarWrapper from "../leftBar/LeftBarWrapper";
import WinnerWrapper from "../winner/WinnerWrapper";
import { GameProps } from "../interfaces";

const Game = ({ winner }: GameProps) => {

  return (
    <div className={styles.game}>
      <LeftBarWrapper />
      <MapWrapper />
      <RightBarWrapper />
      {winner && <WinnerWrapper winner={winner}/>}
    </div>
  )
}

export default Game