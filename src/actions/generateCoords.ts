import { cloneDeep } from 'lodash';
import { MapDataProps } from '../interfaces';

const generateCoords = (mapData: MapDataProps, count: number) => {
    const mapClone = cloneDeep(mapData)

    return Array.from({ length: count }).map(() => {
      const tileIndex = Math.floor(Math.random() * mapClone.length)
      const tile = cloneDeep(mapClone[tileIndex])
      mapClone.splice(tileIndex, 1)
      return tile
    })

  }



export default generateCoords