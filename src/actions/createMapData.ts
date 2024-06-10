import { UnitDataProps } from './../interfaces';
import { MapDataProps } from "../interfaces"
import unitsData from "../neutralUnits.json"
import { random } from 'lodash';

export const createMapData = (mapLength: number) => {
  const units: UnitDataProps[] = unitsData.units
  const mapData: MapDataProps = Array.from({ length: (mapLength * mapLength) }).map((tile, index) =>
    tile = {
      id: `tile${index}`,
      owner: {
        id: "neutral",
        raceId: "neutral",
        name: "Neutrals",
        color: "grey",
        castle: { w: -1, h: -1 },
        activeTileCoords: { w: -1, h: -1 },
        gold: 0,
        actionCount: 0,
        actionMaxCount: 0,
        isAlive: false
      },
      coords: {
        w: index % mapLength,
        h: Math.floor(index / mapLength)
      },
      army:
        units.map(unit => {
          const count = random(Math.floor(10 / unit.power), Math.floor(20 / unit.power))
          return {
            id: unit.id,
            name: unit.name,
            attack: unit.attack,
            hp: unit.hp,
            armor: unit.armor,
            resist: unit.resist,
            power: unit.power,
            distance: unit.distance,
            count: count,
            cost: unit.cost,
            totalHP: unit.hp * count
          }
        }),
      building: "none"
    })

  return mapData
}

export default createMapData