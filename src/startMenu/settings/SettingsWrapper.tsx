import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeTileSize, selectTileSize } from "../../features/map/mapSlice"
import { changeName, selectName } from "../../features/players/playersSlice"
import { pageChange } from "../../features/start/gameSlice"
import { useAppSelector } from "../../redux/reduxHooks"
import Settings from "./Settings"

const SettingsWrapper = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()

  const name = useAppSelector<string>(selectName)
  const [isNameField, setIsNameField] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>(name)

  const tileSize = useAppSelector<number>(selectTileSize)
  const [isTileSizeField, setIsTileSizeField] = useState<boolean>(false)
  const [newTileSize, setNewTileSize] = useState<number>(tileSize)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewName(e.target.value)
    }
  const handleConfirmName = () => {
    setIsNameField(false)
    dispatch(changeName(newName))
  }

  const handleChangeTileSize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewTileSize(Number(e.target.value) || 75)
    }
  const handleConfirmTileSize = () => {
    setIsTileSizeField(false)
    dispatch(changeTileSize(newTileSize))
  }

  const handleExit = () => {
    dispatch(pageChange("menu"))
  }

  return (
    <Settings
      handleExit={handleExit}
      isNameField={isNameField}
      setIsNameField={setIsNameField}
      handleChangeName={handleChangeName}
      handleConfirmName={handleConfirmName}
      name={name}
      isTileSizeField={isTileSizeField}
      setIsTileSizeField={setIsTileSizeField}
      handleChangeTileSize={handleChangeTileSize}
      handleConfirmTileSize={handleConfirmTileSize}
      tileSize={tileSize}
    />
  )
}

export default SettingsWrapper