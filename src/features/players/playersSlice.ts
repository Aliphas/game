import { PlayerProps, playersSliceProps, TileCoordProps } from './../../interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"

const initialState: playersSliceProps = {
  players: [],
  count: 4,
  activeIndex: 0,
  activeTile: undefined
}

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<PlayerProps>) => {
      const newPlayer: PlayerProps = {
        id: action.payload.id,
        raceId: action.payload.raceId,
        name: action.payload.name,
        color: action.payload.color,
        isPlayer: action.payload.isPlayer,
        castle: action.payload.castle,
        gold: 50,
        activeTileCoords: action.payload.castle,
        actionCount: 5,
        actionMaxCount: 5,
        isAlive: true
      }
      state.players = [...state.players, newPlayer]
    },
    changeActiveIndex: (state) => {
      let nextIndex: number
      do {
        nextIndex = ++state.activeIndex % state.players.length
      } while (!state.players[nextIndex].isAlive && state.players.filter(player => player.isAlive).length > 1)
      state.players.filter(player => player.isAlive).length === 1 && (nextIndex = state.activeIndex)

      state.activeIndex = nextIndex
    },
    changeCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    changePlayer: (state, action: PayloadAction<PlayerProps>) => {
      const index = state.players.indexOf(state.players.find(player => player.id === action.payload.id)!)

      state.players[index].name = action.payload.name
      state.players[index].raceId = action.payload.raceId
      state.players[index].castle = action.payload.castle
      state.players[index].color = action.payload.color
      state.players[index].castle = action.payload.castle
    },
    changeGold: (state, action: PayloadAction<number>) => {
      state.players[state.activeIndex].gold += action.payload
    },
    changePlayerActiveTile: (state, action: PayloadAction<TileCoordProps>) => {
      state.players[state.activeIndex].activeTileCoords = action.payload
    },
    playerActionCounter: (state, action: PayloadAction<string | undefined>) => {
      action.payload ? state.players[state.activeIndex].actionCount
        = state.players[state.activeIndex].actionMaxCount : state.players[state.activeIndex].actionCount--
    },
    changePlayerActionMaxCount: (state, action: PayloadAction<number>) => {
      state.players[state.activeIndex].actionMaxCount += action.payload
    },
    changePlayerAlive: (state, action: PayloadAction<string>) => {
      state.players.find(player => player.id === action.payload)!.isAlive = false
    },
    resetPlayersSlice: () => initialState
  }
})

export const selectPlayersCount: (state: RootState) => number = (state: RootState) => state.players.count
export const selectPlayers: (state: RootState) => PlayerProps[] = (state: RootState) => state.players.players
export const selectGold: (state: RootState) => number = (state: RootState) =>
  state.players.players[state.players.activeIndex].gold
export const selectPlayerActionCount: (state: RootState) => number = (state: RootState) =>
  state.players.players[state.players.activeIndex].actionCount
export const selectPlayerActionMaxCount: (state: RootState) => number = (state: RootState) =>
  state.players.players[state.players.activeIndex].actionMaxCount
export const selectActiveIndex: (state: RootState) => number = (state: RootState) =>
  state.players.activeIndex
export const selectActivePlayer: (state: RootState) => PlayerProps = (state: RootState) =>
  state.players.players[state.players.activeIndex]
export const selectActiveTileCoords: (state: RootState) => TileCoordProps = (state: RootState) =>
  state.players.players[state.players.activeIndex].activeTileCoords

export const { addPlayer, changeActiveIndex, changePlayer, changeGold, changePlayerActiveTile,
  playerActionCounter, changePlayerActionMaxCount, changePlayerAlive, resetPlayersSlice } = playersSlice.actions

export default playersSlice.reducer