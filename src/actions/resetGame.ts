import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { resetMapSlice } from '../features/map/mapSlice';
import { resetPlayersSlice } from '../features/players/playersSlice';
import { resetGameSlice } from '../features/start/gameSlice';

const useResetGame = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const resetGame = () => {
    dispatch(resetGameSlice())
    dispatch(resetMapSlice())
    dispatch(resetPlayersSlice())
  }
  return resetGame
}

export default useResetGame