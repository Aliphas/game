//MAP

export interface MapWrapperProps {
  data: DataProps
}
export interface MapProps {
  mapData: MapDataProps
  mapSize: number
  screenPos: TileCoordProps
  mapRef: React.RefObject<HTMLInputElement>
}
export interface MapDataProps extends Array<Tile> { }

export interface MapSliceState {
  mapLength: number
  mapData: MapDataProps
  activeTileId: string | undefined
  tileSize: number
}

export interface SetUnitsProps {
  tileId: string
  newArmy: UnitProps[]
  owner: string
}
export interface SetBuildingProps {
  building: string
  coords: TileCoordProps,
  owner: PlayerProps
}
export interface ChangeTileDataProps {
  id: string
  new: Tile
}
export interface ChangeTileDataCastleProps {
  owner: PlayerProps
  building?: string
  race: string
  coords: { w: number, h: number }
}

//TILE

export interface Tile {
  id: string
  coords: TileCoordProps
  owner: PlayerProps
  army: UnitProps[]
  building: string
}
export interface TileCoordProps {
  w: number
  h: number
}
export interface TileWrapperProps {
  tileData: Tile
  isDragging?: boolean
}
export interface TileItemProps {
  isActive: boolean
  isTarget: boolean
  isPlayer: boolean
  changeActiveTile: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  tileData: Tile
  power: number
  size: number
  color: string | undefined
}

//PLAYER

export interface playersSliceProps {
  players: PlayerProps[]
  count: number
  activeIndex: number
  activeTile: TileCoordProps | undefined
}
export interface PlayerProps {
  id: string
  raceId: string
  name: string
  color: string
  isPlayer: boolean
  castle: TileCoordProps
  gold: number
  actionCount: number
  actionMaxCount: number
  activeTileCoords: TileCoordProps
  isAlive: boolean
}
export interface PlayerData {
  data: PlayerProps
  domains: DomainProps
}
export interface RaceProps {
  id: string
  race: string
  units: UnitDataProps[]
}

//GLOBAL DATA

export interface GameState {
  value: boolean
  page: string
  turn: number
  powerPool: number
  startGold: number
  winner: string | undefined
  colors: Array<string>
  screenPos: TileCoordProps
}

export interface DomainProps {
  id: string
  tiles: Tile[]
}
export interface DataProps extends Array<PlayerData> { }

export interface WinnerProps {
  winnerName: string
  resetGame: () => void
}
export interface WinnerWrapperProps {
  winner: string
}
export interface GameProps {
  winner : string | undefined
}

//ARMY

export interface UnitProps {
  id: string
  name: string
  attack: number
  hp: number
  armor: number
  resist: number
  power: number
  distance: number
  count: number
  totalHP: number
  cost: number
}
export interface UnitCount {
  name: string
  count: number
}
export interface UnitDataProps {
  id: string
  name: string
  attack: number
  hp: number
  armor: number
  resist: number
  power: number
  distance: number
  cost: number
}
export interface CheckActionProps {
  activeTile: Tile
  targetTile: Tile
}
export interface ActionProps {
  activeTile: Tile
  targetTile: Tile
}
export interface HitProps {
  attacker: UnitProps
  targetArmy: UnitProps[]
}

//LEFT BAR
export interface LeftBarProps {
  activeTile: Tile | undefined
  isActivePlayer: boolean
  buyUnit: (props: buyUnitProps) => void
  gold: number
  playerIndex: number
  color: string
}
export interface LeftBarUnitProps {
  unit: UnitProps
  tile: Tile
  isActivePlayer: boolean
  buyUnit: (props: buyUnitProps) => void
  gold: number
  playerIndex: number
  color: string
}
export interface buyUnitProps {
  count: number
  unitId: string
  tile: Tile
  gold: number
}

//RIGHT BAR

export interface RightBarProps {
  player: PlayerProps
  turn: number
  nextTurn: () => void
  index: number
}