import { useState } from "react"
import { LeftBarProps } from "../interfaces"
import LeftBarUnit from "../leftBarUnit/LeftBBarUnit"
import styles from "./leftBar.module.css"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const LeftBar = (props: LeftBarProps) => {
  const { activeTile, isActivePlayer, buyUnit, gold, playerIndex, race } = props
  const [hide, setHide] = useState<boolean>(false)

  return (
    <div
      className={`${styles.leftBar} ${hide ? styles.hideBar : styles.showBar}`}
      style={{ outline: `2px solid ${activeTile?.owner.color}` }}
    >
      <div
        className={styles.hideButton}
        onClick={() => { setHide(!hide) }}
      >
        {hide ? <ArrowForwardIosOutlinedIcon /> : <ArrowBackIosNewOutlinedIcon />}
      </div>
      {activeTile &&
        <div className={styles.leftBarContent}>
          <div className={styles.title}>
            <h3>Owner: {activeTile.owner?.name || "Neutral"} </h3>
            <h3>[{activeTile.coords.w}, {activeTile.coords.h}]</h3>
          </div>
          <p>{race}</p>
          {(activeTile.building === "castle" || activeTile.army.filter(unit => unit.count > 0).length > 0) &&
            <div>
              <h3>Units:</h3>
              {activeTile.army.map((unit, index) => (activeTile.building === "castle" || unit.count > 0) &&
                <LeftBarUnit
                  unit={unit}
                  key={index}
                  tile={activeTile}
                  isActivePlayer={isActivePlayer}
                  buyUnit={buyUnit}
                  gold={gold}
                  playerIndex={playerIndex}
                  color={activeTile.owner.color}
                />
              )}
            </div>
          }
        </div>
      }
    </div>
  )
}

export default LeftBar