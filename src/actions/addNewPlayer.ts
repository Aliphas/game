import { changeTileData, selectMapData } from './../features/map/mapSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './../redux/reduxHooks';
import { MapDataProps, PlayerProps, Tile, TileCoordProps, UnitDataProps } from "../interfaces"
import { addPlayer } from '../features/players/playersSlice';
import { cloneDeep } from 'lodash';
import unitsData from '../units.json'
import useGenerateCoords from './generateCoords';
import { selectColors, selectPowerPool, selectStartGold } from '../features/start/gameSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

const useAddNewPlayer = () => {
  const mapData: MapDataProps = useAppSelector(selectMapData)
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const generateCoords: TileCoordProps[] = useGenerateCoords()
  const powerPool: number = useAppSelector(selectPowerPool)
  const startGold: number = useAppSelector(selectStartGold)
  const colors: Array<string> = useAppSelector(selectColors)

  const units: UnitDataProps[] = unitsData[1].units
  const startUnits = units.map(unit => {
    return {
      id: unit.id,
      name: unit.name,
      attack: unit.attack,
      hp: unit.hp,
      armor: unit.armor,
      resist: unit.resist,
      power: unit.power,
      distance: unit.distance,
      count: Math.floor(powerPool/unit.power),
      cost: unit.cost,
      totalHP: unit.hp * Math.floor(powerPool/unit.power)
    }
  })

  const addNewPlayer = (index: number) => {
    const newMapData = cloneDeep(mapData)
    const player: PlayerProps = {
      id: `p${index}`,
      raceId: "r1",
      name: `Player ${index + 1}`,
      color: colors[index],
      isPlayer: true,
      castle: generateCoords[index],
      gold: startGold,
      activeTileCoords: generateCoords[index],
      actionCount: 5,
      actionMaxCount: 5,
      isAlive: true
    }
    const tile: Tile = newMapData.find(tile => tile.coords.w === player.castle.w && tile.coords.h === player.castle.h)!
    tile.owner = cloneDeep(player)
    tile.building = "castle"
    tile.army = startUnits
    dispatch(addPlayer(player))
    dispatch(changeTileData(tile))
  }

  return addNewPlayer
}
export default useAddNewPlayer