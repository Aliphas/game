import { Button, TextField } from "@mui/material"
import { StartLobbyProps } from "../interfaces"
import PlayerItemWrapper from "./PlayerItemWrapper"
import styles from "./startLobby.module.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const StartLobby = (props: StartLobbyProps) => {
  const { handleStart, addPlayerInfo, changePlayerInfo, playersInfo,
    isNewAvailable, deletePlayerInfo, mapSize, handleMapSize, handleExit } = props

  return (
    <div>
      <ArrowBackOutlinedIcon className={styles.backArrowIcon}
        sx={{
          width: "50px",
          height: "auto"
        }}
        onClick={handleExit}
      />
      <div className={styles.startLobby}>
        <div className={styles.titles}>
          <div className={styles.index}>#</div>
          <div className={styles.name}>Name</div>
          <div className={styles.color}>Color</div>
          <div className={styles.race}>Race</div>
        </div>
        {playersInfo.map((_, index: number) => {
          return (
            <PlayerItemWrapper
              index={index}
              playersInfo={playersInfo}
              changePlayerInfo={changePlayerInfo}
              deletePlayerInfo={deletePlayerInfo}
              key={index}
            />
          )
        })}
        {isNewAvailable === true &&
          <div className={styles.addPlayerButton}>
            <Button
              variant="contained"

              onClick={addPlayerInfo}
            >
              New player
            </Button>
          </div>
        }
        <div className={styles.bottom}>
          <div className={styles.mapLength}>
            Map size: <TextField
              inputProps={{ type: 'number', min: 5, max: 30, padding: "5px" }}
              sx={{ margin: "0 10px" }}
              value={mapSize}
              onChange={(e) => handleMapSize(Number(e.target.value))}
            ></TextField> x {mapSize} (From 5 to 30)
          </div>
          <div className={styles.startButton}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f7912b",
                "&:hover": {
                  backgroundColor: "#07912b"
                }
              }}
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartLobby