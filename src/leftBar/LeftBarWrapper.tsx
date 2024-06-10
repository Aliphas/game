import useBuyUnit from "../actions/buyUnit"
import getRaceName from "../actions/getRaceName"
import { selectMapData } from "../features/map/mapSlice"
import { selectActivePlayer, selectActiveTileCoords, selectPlayers } from "../features/players/playersSlice"
import { buyUnitProps, MapDataProps, PlayerProps, Tile, TileCoordProps } from "../interfaces"
import { useAppSelector } from "../redux/reduxHooks"
import LeftBar from "./LeftBar"

const LeftBarWrapper = () => {
  const activeTileCoords: TileCoordProps = useAppSelector(selectActiveTileCoords)
  const mapData: MapDataProps = useAppSelector(selectMapData)
  const activeTile: Tile = mapData.find(tile => tile.coords.w === activeTileCoords.w && tile.coords.h === activeTileCoords.h)!
  const activePlayer: PlayerProps = useAppSelector(selectActivePlayer)
  const players: PlayerProps[] = useAppSelector(selectPlayers)
  const playerIndex: number = players.indexOf(activePlayer)
  const isActivePlayer: boolean = activeTile?.owner.id === activePlayer.id
  const race: string = getRaceName(activeTile.owner.raceId)
  const buyUnit: (props: buyUnitProps) => void = useBuyUnit()

  return (
    <LeftBar
      activeTile={activeTile}
      isActivePlayer={isActivePlayer}
      buyUnit={buyUnit} 
      gold={activePlayer.gold}
      playerIndex={playerIndex}
      race={race}
    />
  )
}

export default LeftBarWrapper