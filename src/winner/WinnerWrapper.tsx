import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { resetMapSlice } from "../features/map/mapSlice"
import { resetPlayersSlice } from "../features/players/playersSlice"
import { resetGameSlice } from "../features/start/gameSlice"
import { WinnerWrapperProps } from "../interfaces"
import Winner from "./Winner"

const WinnerWrapper = ({winner}: WinnerWrapperProps) => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const resetGame = () => {
    dispatch(resetGameSlice())
    dispatch(resetMapSlice())
    dispatch(resetPlayersSlice())
  }
  return <Winner winnerName={winner} resetGame={resetGame}/>
}

export default WinnerWrapper