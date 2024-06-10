import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/reduxHooks"
import { selectTileSize, selectMapData } from "../features/map/mapSlice"
import { CheckActionProps, MapDataProps, PlayerProps, Tile, TileCoordProps, TileWrapperProps } from "../interfaces"
import TileItem from "./TileItem"
import useCheckAction from "../actions/checkAction"
import { useState } from "react"
import { changePlayerActiveTile, selectActivePlayer, selectActiveTileCoords } from "../features/players/playersSlice"
import compareTiles from "../actions/compareTiles"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

const TileWrapper = (props: TileWrapperProps) => {
  const { tileData, isDragging } = props
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const activeTileCoords: TileCoordProps = useAppSelector<TileCoordProps>(selectActiveTileCoords)
  const activePlayer: PlayerProps = useAppSelector<PlayerProps>(selectActivePlayer)
  const mapData: MapDataProps = useAppSelector<MapDataProps>(selectMapData)
  const activeTile: Tile | undefined = mapData.find(tile =>
    tile.coords.w === activeTileCoords.w
    && tile.coords.h === activeTileCoords.h)
  const color: string | undefined = activeTile?.owner?.color
  const size: number = useAppSelector<number>(selectTileSize)
  const checkAction: (props: CheckActionProps) => void = useCheckAction()
  const [target, setTarget] = useState<boolean>(false)

  const changeActiveTile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.button === 0 && !isDragging && dispatch(changePlayerActiveTile(tileData.coords))
    }

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()
      activeTile && compareTiles(activeTile, tileData) && setTarget(true)
      setTimeout(() => setTarget(false), 500)
      activeTile && activeTile.id !== tileData.id &&
        checkAction({ activeTile, targetTile: tileData })
    }

  const armyPower: number = tileData.army.map(unit => unit.power * unit.count)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  return <TileItem
    isActive={activeTile?.id === tileData.id}
    isTarget={target}
    isPlayer={activePlayer.id === tileData.owner.id}
    changeActiveTile={changeActiveTile}
    handleMove={handleMove}
    tileData={tileData}
    power={armyPower}
    size={size}
    color={color}
  />
}

export default TileWrapper