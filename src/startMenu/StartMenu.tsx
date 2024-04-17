import { useDispatch } from "react-redux"
import useStartGame from "../actions/startGame"
import { pageChange } from "../features/start/gameSlice"
import styles from "./menu.module.css"

const StartMenu = () => {
  const dispatch = useDispatch()
  const startgame = useStartGame()
  const handleStart = () => startgame()

  return (
    <div className={styles.menuBg}>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={() => handleStart()}>Start</button>
        <button className={styles.menuButton} onClick={() => dispatch(pageChange("settings"))}>Settings</button>
        <button className={styles.menuButton} onClick={() => dispatch(pageChange("about"))}>About</button>
      </div>
    </div>
  )
}

export default StartMenu