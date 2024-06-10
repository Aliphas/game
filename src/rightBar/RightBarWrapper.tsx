import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import getRaceName from "../actions/getRaceName"
import useNextTurn from "../actions/nexTurn"
import { selectActivePlayer, selectPlayers } from "../features/players/playersSlice"
import { pageChange, selectTurn } from "../features/start/gameSlice"
import { PlayerProps } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import RightBar from "./RightBar"

const RightBarWrapper = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const player: PlayerProps = useAppSelector(selectActivePlayer)
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const index: number = players.indexOf(player)
  const turn: number = useAppSelector(selectTurn)
  const race: string = getRaceName(player.raceId)
  const endTurn: () => void = useNextTurn()
  const nextTurn: () => void = () => { endTurn() }
  const openMenu: () => void = () => { dispatch(pageChange("menu")) }

  return <RightBar
    player={player}
    turn={turn}
    nextTurn={nextTurn}
    index={index}
    openMenu={openMenu}
    race={race} />
}

export default RightBarWrapper