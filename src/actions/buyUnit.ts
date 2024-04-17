import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { changeTileData } from '../features/map/mapSlice';
import { changeGold } from '../features/players/playersSlice';
import { buyUnitProps, Tile } from "../interfaces"

const useBuyUnit = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const buyUnit = (props: buyUnitProps) => {
    const { count, unitId, tile, gold } = props
    const newTile: Tile = cloneDeep(tile)
    const unit = newTile.army.find(unit => unit.id === unitId)!
    gold >= unit.cost*count && (unit.count += count) && dispatch(changeGold(-unit.cost*count))
    dispatch(changeTileData(newTile))
  }
  return buyUnit
}

export default useBuyUnit