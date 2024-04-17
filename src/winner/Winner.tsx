import { WinnerProps } from "../interfaces"
import styles from "./winner.module.css"

const Winner = (props: WinnerProps) => {
  const { winnerName, resetGame } = props
  const handleClick: () => void = () => { resetGame() }

  return <div className={styles.winnerWrapper} onClick={handleClick}>
    <div className={styles.winnerBg}></div>
    <div className={styles.winner}>{winnerName} won!</div>
  </div>
}

export default Winner