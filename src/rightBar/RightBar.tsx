import { Button } from "@mui/material"
import { RightBarProps } from "../interfaces"
import styles from "./rightBar.module.css"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const RightBar = (props: RightBarProps) => {
  const { player, turn, nextTurn, index, openMenu, race } = props
  const handleNextTurn: () => void = () => { nextTurn() }
  const handleOpenMenu: () => void = () => { openMenu() }
  const [hide, setHide] = useState<boolean>(false)

  return (
    <div
      className={`${styles.rightBar} ${hide ? styles.hideBar : styles.showBar} `}
      style={{ outline: `2px solid ${player.color}` }}
    >
      <div
        className={styles.hideButton}
        onClick={() => { setHide(!hide) }}
      >
        {hide ? <ArrowBackIosNewOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
      </div>
      <div className={styles.rightBarContent}>
        <div className={styles.playerData}>
          <h3>Player: {player.name}</h3>
          <p>{race}</p>
          <p>Actions: {player.actionCount}/{player.actionMaxCount}</p>
          <p>Gold: {player.gold}</p>
          <p>Turn: {turn}</p>
        </div>
        <Button
          variant="contained"
          disabled={index === 0 ? false : true}
          style={{ backgroundColor: player.color }}
          sx={{
            width: "100%",
            "&:hover": { color: "white" }
          }}
          onClick={handleNextTurn}
        >
          End turn
        </Button>
        <div className={styles.menuButtonWrapper}>
          <MenuIcon
            className={styles.menuButton}
            sx={{
              color: player.color,
              width: "50px",
              height: "auto",
              "&:hover": {
                color: "white",
                backgroundColor: player.color
              }
            }}
            onClick={handleOpenMenu}
          />
        </div>
      </div>

    </div>
  )
}

export default RightBar