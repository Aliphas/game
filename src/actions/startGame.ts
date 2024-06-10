import { useDispatch } from 'react-redux';
import { changeIsGame, pageChange } from '../features/start/gameSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useStartGame = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const startGame = () => {
    dispatch(changeIsGame())
    dispatch(pageChange("game"))
  }
  return startGame
}

export default useStartGame