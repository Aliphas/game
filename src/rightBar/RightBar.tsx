import { Button } from "@mui/material"
import { RightBarProps } from "../interfaces"
import styles from "./rightBar.module.css"



const RightBar = (props: RightBarProps) => {
  const { player, turn, nextTurn, index } = props
  const handleNextTurn: () => void = () => { nextTurn() }

  return (
    <div className={styles.rightBar} style={{ outline: `2px solid ${player.color}` }}>
      <h3>Player: {player.name}</h3>
      <p>Actions: {player.actionCount}/{player.actionMaxCount}</p>
      <p>Gold: {player.gold}</p>
      <div>Turn: {turn}</div>
      <Button
        variant="contained"
        disabled={index === 0 ? false : true}
        style={{ backgroundColor: player.color, margin: "20px auto", width: "80%" }}
        onClick={handleNextTurn}
      >
        End turn
      </Button>
    </div>
  )
}

export default RightBar