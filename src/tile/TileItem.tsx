import { TileItemProps } from "../interfaces"
import styles from "./tile.module.css"
import castleIcon from "../assets/castle.png"

const TileItem = (props: TileItemProps) => {
  const { isActive, isTarget, isPlayer, changeActiveTile, handleMove, tileData, power, size, color } = props

  const handleTarget: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleMove(e)
    }
  const tileColor: string = tileData.owner.color

  return (
    <div className={styles.tile}
      style={{
        backgroundColor: tileColor,
        width: size,
        height: size,
        outline: isActive ? "1px solid #dddddd" : isTarget ? `1px solid ${color}` : "1px solid black",
        outlineOffset: "-1px"
      }}
      onClick={(e) => changeActiveTile(e)}
      onContextMenu={(e) => handleTarget(e)}
    >
      <div className={styles.buildingIcon}>
        {tileData.building === "castle" && <img src={castleIcon} alt="castle" />}
      </div>
      <div className={styles.power}
        style={{ color: isPlayer ? "#dddddd" : "#222222" }}
      >
        {power}
      </div>
    </div>
  )
}

export default TileItem