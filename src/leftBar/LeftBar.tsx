import { LeftBarProps } from "../interfaces"
import LeftBarUnit from "../leftBarUnit/LeftBBarUnit"
import styles from "./leftBar.module.css"

const LeftBar = (props: LeftBarProps) => {
  const { activeTile, isActivePlayer, buyUnit, gold, playerIndex, color } = props

  return (
    <div className={styles.leftBar} style={{ outline: `2px solid ${color}` }}>
      {activeTile &&
        <div>
          <p>Coordinates [{activeTile.coords.w}, {activeTile.coords.h}]</p>
          <div>
            <h3>Owner: {activeTile.owner?.name || "Neutral"}</h3>
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
                    color={color}
                  />
                )}
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default LeftBar