import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"
import useAddNewPlayer from "../actions/addNewPlayer"
import createMapData from "../actions/createMapData"
import generateCoords from "../actions/generateCoords"
import useResetGame from "../actions/resetGame"
import { changeMap, selectMapLength } from "../features/map/mapSlice"
import { selectName } from "../features/players/playersSlice"
import { changeIsGame, pageChange, selectColors } from "../features/start/gameSlice"
import { AddNewPlayerProps, MapDataProps, PlayerInfoProps, Tile } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import StartLobby from "./StartLobby"

const StartLobbyWrapper = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const colors: string[] = useAppSelector<Array<string>>(selectColors)
  const userName: string = useAppSelector<string>(selectName)
  const length: number = useAppSelector<number>(selectMapLength)

  const initialPlayersInfo: PlayerInfoProps[] = Array.from({ length: 2 }).map((_, index) => {
    return {
      id: `p${index}`,
      raceId: "rand",
      name: index === 0 ? userName : `AI ${index}`,
      color: colors[index]
    }
  })

  const [playersInfo, setPlayersInfo] = useState<PlayerInfoProps[]>(initialPlayersInfo)
  const [isNewAvailable, setIsNewAvailable] = useState<boolean>(true)
  const [mapSize, setMapSize] = useState<number>(length)
  const addNewPlayer: (props: AddNewPlayerProps) => void = useAddNewPlayer()
  const resetGame: () => void = useResetGame()
  const findColor: () => string = () => {
    return colors.find(color => !playersInfo.find(player => player.color === color))!
  }

  const changePlayerInfo = (playerInfo: PlayerInfoProps) => {
    const playersInfoClone: PlayerInfoProps[] = cloneDeep(playersInfo)
    const playerIndex: number = playersInfoClone.indexOf(playersInfoClone.find(player => player.id === playerInfo.id)!)
    const anotherPlayer: PlayerInfoProps | undefined =
      playersInfoClone.find(player => player.color === playerInfo.color && player.id !== playerInfo.id)
    anotherPlayer && (anotherPlayer.color = playersInfoClone[playerIndex].color)
    playersInfoClone[playerIndex] = playerInfo
    setPlayersInfo(playersInfoClone)
  }

  const deletePlayerInfo = (index: number) => {
    const playersInfoClone: PlayerInfoProps[] = cloneDeep(playersInfo)
    playersInfoClone.splice(index, 1)
    playersInfoClone.map((player, index) => player.name = index === 0 ? userName : `Player ${index + 1}`)
    setPlayersInfo(playersInfoClone)
    setIsNewAvailable(true)
  }

  const addPlayerInfo = () => {
    const newPlayerInfo: PlayerInfoProps = {
      id: `p${playersInfo.length}`,
      raceId: "rand",
      name: `AI ${playersInfo.length}`,
      color: findColor()
    }
    const newPlayersInfo: PlayerInfoProps[] = cloneDeep(playersInfo)
    newPlayersInfo.push(newPlayerInfo)
    setPlayersInfo(newPlayersInfo)
    playersInfo.length + 1 >= colors.length && setIsNewAvailable(false)
  }
  const handleMapSize = (e: number) => {
    setMapSize(e)
  }

  const handleStart = () => {
    resetGame()
    const size = mapSize < 5 ? 5 : mapSize > 30 ? 30 : mapSize
    const newMap: MapDataProps = createMapData(size)
    dispatch(changeMap(newMap))
    const tiles = generateCoords(newMap, playersInfo.length)
    playersInfo.map((playerInfo, index) => {
      addNewPlayer({ playerInfo, generatedTile: tiles[index] })
    })
    dispatch(changeIsGame())
    dispatch(pageChange("game"))
  }

  const handleExit = () => {
    dispatch(pageChange("menu"))
  }

  return (
    <StartLobby
      handleStart={handleStart}
      addPlayerInfo={addPlayerInfo}
      changePlayerInfo={changePlayerInfo}
      playersInfo={playersInfo}
      isNewAvailable={isNewAvailable}
      deletePlayerInfo={deletePlayerInfo}
      mapSize={mapSize}
      handleMapSize={handleMapSize}
      handleExit={handleExit}
    />
  )
}

export default StartLobbyWrapper