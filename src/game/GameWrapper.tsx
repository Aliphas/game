import { useEffect } from "react"
import { useAppSelector } from "../redux/reduxHooks"
import Game from "./Game"
import { useDispatch } from "react-redux"
import { changePlayerAlive, selectActiveIndex, selectPlayers } from "../features/players/playersSlice"
import { changeActiveTileId, selectMapData } from "../features/map/mapSlice"
import { MapDataProps, PlayerProps } from "../interfaces"
import { selectWinner, setScreenPos, setWinner } from "../features/start/gameSlice"
import useNextTurn from "../actions/nexTurn"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

const GameWrapper = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const mapData: MapDataProps = useAppSelector(selectMapData)
  const activePlayerIndex: number = useAppSelector(selectActiveIndex)
  const winner: string | undefined = useAppSelector(selectWinner)
  const nextTurn: () => void = useNextTurn()

  useEffect(() => {
    players.map(player => {
      mapData.filter(tile => tile.owner.id === player.id).length < 1 && dispatch(changePlayerAlive(player.id))
    })
  }, [mapData])

  useEffect(() => {
    const activeTileId: string | undefined = mapData.find(tile =>
      tile.coords.w === players[activePlayerIndex].activeTileCoords.w &&
      tile.coords.h === players[activePlayerIndex].activeTileCoords.h)!.id
    activeTileId ? dispatch(changeActiveTileId(activeTileId)) : dispatch(changeActiveTileId(undefined))
    dispatch(setScreenPos(players[activePlayerIndex].activeTileCoords || players[activePlayerIndex].castle))
    activePlayerIndex > 0 && setTimeout(() => nextTurn(), 500) 
  }, [activePlayerIndex])

  useEffect(() => {
    players.filter(player => player.isAlive).length < 2
      && dispatch(setWinner(players.find((player => player.isAlive))!.name))
  }, [players])

  return <Game winner={winner} />
}

export default GameWrapper