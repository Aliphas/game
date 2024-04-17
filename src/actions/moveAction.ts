import { useDispatch } from 'react-redux';
import { cloneDeep } from "lodash"
import { ActionProps, Tile } from "../interfaces"
import { changeTileData } from '../features/map/mapSlice';
import { changePlayerActiveTile, playerActionCounter } from '../features/players/playersSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useMoveAction = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const moveAction = (props: ActionProps) => {
    const { activeTile, targetTile } = props
    const activeTileClone: Tile = cloneDeep(activeTile)
    const targetTileClone: Tile = cloneDeep(targetTile)
    
    targetTileClone.army.map((unit, index) => {
      unit.count += activeTile.army[index].count
    })
    dispatch(changeTileData(targetTileClone))
    activeTileClone.army.map(unit => unit.count = 0)
    dispatch(changeTileData(activeTileClone))
    dispatch(changePlayerActiveTile(targetTile.coords))
    dispatch(playerActionCounter())
  }
  return moveAction
}

export default useMoveAction