import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { PlayerItemProps, RaceInfo } from "../interfaces"
import styles from "./startLobby.module.css"
import ClearIcon from '@mui/icons-material/Clear';

const PlayerItem = (props: PlayerItemProps) => {
  const { index, playerInfo, racesList, handleChange, colors, handleDelete } = props

  return <div className={styles.player}>
    <div className={styles.index}>{index + 1}</div>
    <div className={styles.name}>{playerInfo.name}</div>
    <div className={styles.color}>
      <div style={{ backgroundColor: playerInfo.color }}>
        <FormControl sx={{ "&:hover": { outline: "1px solid #f7912b" } }}>
          <Select
            id="color-select"
            value={playerInfo.color}
            onChange={(e: SelectChangeEvent<string>) => handleChange({ color: e.target.value })}

            MenuProps={{
              PaperProps: {
                sx: {
                  "& ul": {
                    padding: 0,
                    outline: "none",
                    border: "none",
                  },
                  "& li:hover": {
                    border: "1px solid white"
                  }
                },
              },
            }}
          >
            {colors.map((color: string, index: number) => {
              return color !== playerInfo.color && <MenuItem
                value={color}
                key={index}
                sx={{
                  backgroundColor: color,
                  width: "35px",
                  height: "35px",
                  "&:hover": {
                    backgroundColor: color,
                  }
                }}
              />
            })}
          </Select>
        </FormControl>
      </div>
    </div>
    <Box>
      <FormControl
        sx={{
          width: "200px",
          height: "50px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Select
          id="race-select"
          value={playerInfo.raceId}
          onChange={(e: SelectChangeEvent) => handleChange({ race: e.target.value })}
          style={{ height: "40px", color: "#f7912b", outline: "none" }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#404040",
                color: "#f7912b",
                "&:active": { border: "1pxs solid red" },
                "& ul": {
                  padding: 0
                },
                "& li": {
                  height: "45px"
                }
              },
            },
          }}
        >
          {racesList.map((race: RaceInfo, index: number) => {
            return <MenuItem value={race.id} key={index} sx={{ height: "45px" }}>{race.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
    {index > 1 &&
      <div className={styles.delete} onClick={handleDelete}>
        <ClearIcon
          sx={{
            color: "#c62828",
            width: "30px",
            height: "auto",
            borderRadius: "50%",
            "&:hover": {
              color: "#f44336",
              cursor: "pointer"
            }
          }}
        />
      </div>}
  </div>
}


export default PlayerItem