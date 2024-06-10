import { UnitProps, PlayerInfoProps, TileCoordProps, AddNewPlayerProps } from './../interfaces';
import { changeTileData, selectMapData } from './../features/map/mapSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './../redux/reduxHooks';
import { MapDataProps, PlayerProps, Tile } from "../interfaces"
import { addPlayer, } from '../features/players/playersSlice';
import { cloneDeep } from 'lodash';
import unitsData from '../units.json'
import { selectPowerPool, selectStartGold } from '../features/start/gameSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import generateCoords from './generateCoords';



const useAddNewPlayer = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch()
  const powerPool: number = useAppSelector(selectPowerPool)
  const startGold: number = useAppSelector(selectStartGold)

  const addNewPlayer = (props: AddNewPlayerProps) => {
    const { playerInfo, generatedTile} = props
      const player: PlayerProps = {
        id: playerInfo.id,
        raceId: playerInfo.raceId !== "rand" ?
          playerInfo.raceId
          : unitsData[Math.floor(Math.random() * (unitsData.length))].id,
        name: playerInfo.name,
        color: playerInfo.color,
        castle: generatedTile.coords,
        gold: startGold,
        activeTileCoords: generatedTile.coords,
        actionCount: 5,
        actionMaxCount: 5,
        isAlive: true
      }

      const raceIndex: number = unitsData.indexOf(unitsData.find(race => race.id === player.raceId)!)
      const startUnits: UnitProps[] = unitsData[raceIndex].units.map(unit => {
        return {
          id: unit.id,
          name: unit.name,
          attack: unit.attack,
          hp: unit.hp,
          armor: unit.armor,
          resist: unit.resist,
          power: unit.power,
          distance: unit.distance,
          count: Math.floor(powerPool / unit.power),
          cost: unit.cost,
          totalHP: unit.hp * Math.floor(powerPool / unit.power)
        }
      })

      const tile: Tile = cloneDeep(generatedTile)
      tile.owner = cloneDeep(player)
      tile.building = "castle"
      tile.army = startUnits
      dispatch(addPlayer(player))
      dispatch(changeTileData(tile))
    }

  return addNewPlayer
}
export default useAddNewPlayer