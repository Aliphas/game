import { Button } from "@mui/material"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { pageChange } from "../features/start/gameSlice"
import { StartMenuProps } from "../interfaces"
import styles from "./menu.module.css"

const StartMenu = ({ isGame }: StartMenuProps) => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  return (
    <div className={styles.menuBg}>
      <div className={styles.menu}>
        {isGame &&
          <Button variant="contained" className={styles.menuButton} onClick={() => dispatch(pageChange("game"))}> Continue </Button>}
        <Button variant="contained" className={styles.menuButton} onClick={() => dispatch(pageChange("create"))}>New game</Button>
        {/* {isGame && 
            <Button variant="contained" disabled className={styles.menuButton}>Save</Button>}
          <Button variant="contained" disabled className={styles.menuButton}>Load</Button> */}
        <Button variant="contained" className={styles.menuButton} onClick={() => dispatch(pageChange("settings"))}>Settings</Button>
        <Button variant="contained" className={styles.menuButton} onClick={() => dispatch(pageChange("about"))}>About</Button>
      </div>
    </div>
  )
}




export default StartMenu