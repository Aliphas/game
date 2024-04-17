import useBuyUnit from "../actions/buyUnit"
import { selectMapData } from "../features/map/mapSlice"
// import { selectActiveTile } from "../features/map/mapSlice"
import { selectActivePlayer, selectActiveTileCoords, selectPlayers } from "../features/players/playersSlice"
import {  PlayerProps, Tile, TileCoordProps } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import LeftBar from "./LeftBar"

const LeftBarWrapper = () => {
  const activeTileCoords = useAppSelector<TileCoordProps | undefined>(selectActiveTileCoords)
  const mapData = useAppSelector(selectMapData)
  const activeTile = mapData.find(tile => tile.coords.w === activeTileCoords?.w && tile.coords.h === activeTileCoords.h)
  const activePlayer = useAppSelector<PlayerProps>(selectActivePlayer)
  const players = useAppSelector<PlayerProps[]>(selectPlayers)
  const playerIndex = players.indexOf(activePlayer)
  const isActivePlayer: boolean = activeTile?.owner.id === activePlayer.id
  const buyUnit = useBuyUnit()

  return <LeftBar activeTile={activeTile} isActivePlayer={isActivePlayer} buyUnit={buyUnit} gold={activePlayer.gold} playerIndex={playerIndex} color={activePlayer.color}/>
}

export default LeftBarWrapper