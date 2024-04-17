import { selectActiveIndex } from './../features/players/playersSlice';
import { useDispatch } from 'react-redux';
import { changeActiveIndex, changeGold, playerActionCounter, selectPlayers } from '../features/players/playersSlice';
import { turnCounter } from '../features/start/gameSlice';
import { useAppSelector } from '../redux/reduxHooks';
import { selectMapData } from '../features/map/mapSlice';
import { MapDataProps, PlayerProps } from '../interfaces';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useNextTurn = () => {
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const currIndex: number = useAppSelector(selectActiveIndex)
  const mapData: MapDataProps = useAppSelector(selectMapData)

  const nextTurn = () => {
    dispatch(changeGold(15 + mapData.filter(tile => tile.owner.id === players[currIndex].id).length))
    dispatch(playerActionCounter('default'))
    currIndex === players.length - 1 && dispatch(turnCounter())
    dispatch(changeActiveIndex())
  }
  return nextTurn
}

export default useNextTurn