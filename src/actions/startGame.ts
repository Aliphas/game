import { useDispatch } from 'react-redux';
import { pageChange } from '../features/start/gameSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import useAddNewPlayer from './addNewPlayer';
import { useAppSelector } from '../redux/reduxHooks';
import { selectPlayersCount } from '../features/players/playersSlice';

const useStartGame = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const addNewPlayer: (index: number) => void = useAddNewPlayer()
  const count: number = useAppSelector(selectPlayersCount)

  const startGame = () => {
    Array.from({ length: count }).map((_, index) => {
      addNewPlayer(index)
    })
    dispatch(pageChange("game"))
  }
  return startGame
}

export default useStartGame