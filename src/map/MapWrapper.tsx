import { useAppSelector } from "../redux/reduxHooks"
import { selectMapData, selectMapLength, selectTileSize } from "../features/map/mapSlice"
import { MapDataProps, TileCoordProps } from "../interfaces"
import Map from "./Map"
import styles from "./map.module.css"
import { selectScreenPos } from "../features/start/gameSlice"
import { useEffect, useRef } from "react"
import { selectActiveIndex } from "../features/players/playersSlice"

const MapWrapper = () => {
  const mapLength: number = useAppSelector(selectMapLength)
  const mapData: MapDataProps = useAppSelector(selectMapData)
  const size: number = useAppSelector(selectTileSize)
  const screenPos: TileCoordProps = useAppSelector(selectScreenPos)
  const activePlayer: number = useAppSelector(selectActiveIndex)
  const currScreenPos: TileCoordProps = {
    w: (window.innerWidth / 2) - screenPos.w*size,
    h: (window.innerHeight / 2) -screenPos.h*size
  }
  const mapRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  useEffect(() => {
    mapRef.current && (mapRef.current.style.transform = "none")
  }, [activePlayer])

  return (
    <div className={styles.container}>
      <Map mapData={mapData} mapSize={mapLength*size} screenPos={currScreenPos} mapRef={mapRef}/>
    </div>
  )
}

export default MapWrapper