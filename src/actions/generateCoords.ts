import { cloneDeep } from 'lodash';
import { useAppSelector } from './../redux/reduxHooks';
import { MapDataProps, Tile, TileCoordProps } from '../interfaces';
import { selectPlayersCount } from '../features/players/playersSlice';
import { selectMapData } from '../features/map/mapSlice';

const useGenerateCoords = () => {
  const mapData: MapDataProps = useAppSelector(selectMapData)
  const availableTiles: Tile[] = cloneDeep(mapData).filter(tile => tile.building === "none")
  const playersCount: number = useAppSelector(selectPlayersCount)

  const generateCoords = () => {
    const index: number = Math.floor(Math.random() * availableTiles.length)
    const newTile: Tile = availableTiles[index]
    const coords: TileCoordProps = newTile.coords
    availableTiles.splice(availableTiles.indexOf(newTile), 1)
    return coords
  }
  const generateArray = () => {
    return Array.from({ length: playersCount }).map(() => { 
      const coords: TileCoordProps = generateCoords()
      return coords
    })
  }
  return generateArray()
}

export default useGenerateCoords