import { useDispatch } from 'react-redux';
import { cloneDeep } from "lodash"
import { changeTileData, selectMapData } from "../features/map/mapSlice"
import { selectPlayers } from "../features/players/playersSlice"
import { PlayerProps, Tile } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useRemovePlayer = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const mapData: Tile[] = useAppSelector(selectMapData)

  const removePlayer = (index: number) => {
    const tiles: Tile[] = mapData.filter(tile => tile.owner.id === players[index].id)
    tiles.map(tile => {
      const newTile = cloneDeep(tile)
      newTile.owner = {
        id: "neutral",
        raceId: "neutral",
        name: "Neutrals",
        color: "grey",
        castle: { w: -1, h: -1 },
        activeTileCoords: { w: -1, h: -1 },
        gold: 0,
        actionCount: 0,
        actionMaxCount: 0,
        isAlive: false
      }
      newTile.army = []
      dispatch(changeTileData(newTile))
    })
  }
  return removePlayer
}

export default useRemovePlayer