import useNextTurn from "../actions/nexTurn"
import { selectActivePlayer, selectPlayers } from "../features/players/playersSlice"
import { selectTurn } from "../features/start/gameSlice"
import { PlayerProps } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import RightBar from "./RightBar"

const RightBarWrapper = () => {
  const player: PlayerProps = useAppSelector(selectActivePlayer)
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const index: number = players.indexOf(player)
  const turn: number = useAppSelector(selectTurn)
  const endTurn: () => void = useNextTurn()
  const nextTurn: () => void  = () => { endTurn() }

  return <RightBar player={player} turn={turn} nextTurn={nextTurn} index={index}/>
}

export default RightBarWrapper