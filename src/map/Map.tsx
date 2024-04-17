import { useState } from "react"
import Draggable from "react-draggable"
import { MapProps } from "../interfaces"
import styles from "./map.module.css"
import TileWrapper from "../tile/TileWrapper"

const Map = (props: MapProps) => {
  const { mapData, mapSize, screenPos, mapRef } = props
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const eventControl = (event: { type: string }) => {
    if (event.type === "mousemove" || event.type === "touchmove") {
      setIsDragging(true)

    }
    if (event.type === "mouseup" || event.type === "touchend") {
      setTimeout(() => { setIsDragging(false) }, 300)
    }
  }

  return (
    <Draggable
      axis="both"
      onDrag={eventControl}
      onStop={eventControl}
    >
      <div
        ref={mapRef}
        className={styles.map}
        style={{ width: `${mapSize}px`, backgroundColor: "red", left: screenPos.w, top: screenPos.h }}>
        {mapData.map((tile, index) => <TileWrapper tileData={tile} isDragging={isDragging} key={index} />)}
      </div>
    </Draggable>
  )
}

export default Map