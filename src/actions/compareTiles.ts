import { Tile } from "../interfaces"

const compareTiles = (activeTile: Tile, targetTile: Tile) => {
  const isNear: boolean = (Math.abs(activeTile.coords.w - targetTile.coords.w) === 1 
  && Math.abs(activeTile.coords.h - targetTile.coords.h) === 0)
  || (Math.abs(activeTile.coords.w - targetTile.coords.w) === 0 
  && Math.abs(activeTile.coords.h - targetTile.coords.h) === 1)
  return isNear
}

export default compareTiles