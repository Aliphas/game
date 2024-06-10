import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GameState, TileCoordProps } from "../../interfaces"
import { RootState } from "../../redux/store"

const initialState: GameState = {
  isGame: false,
  race: "r0",
  page: "menu",
  turn: 1,
  powerPool: 50,
  startGold: 50,
  winner: undefined,
  colors: [ "#D2042D", "#3288BD", "green", "purple", "#C2B280", "#454B1B",
    "DarkSlateGray", "Tomato", "#9e0142", "#FDAE61", "#66C2A5", "#5E4FA2"],
  screenPos: {
    w: 0,
    h: 0
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeIsGame: (state) => {
      state.isGame = !state.isGame
    },
    changeRace: (state, action: PayloadAction<string>) => {
      state.race = action.payload
    },
    pageChange: (state, action: PayloadAction<string>) => {
      state.page = action.payload
    },
    turnCounter: (state) => {
      state.turn++
    },
    setPowerPool: (state, action: PayloadAction<number>) => {
      state.powerPool = action.payload
    },
    setStartGold: (state, action: PayloadAction<number>) => {
      state.startGold = action.payload
    },
    setWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload
    },
    setScreenPos: (state, action: PayloadAction<TileCoordProps>) => {
      state.screenPos = { w: action.payload.w, h: action.payload.h }
    },
    changeColors: (state, action: PayloadAction<Array<string>>) => {
      state.colors = action.payload
    },
    addColor: (state, action: PayloadAction<string>) => {
      state.colors.push(action.payload)
    },
    resetGameSlice: () => initialState
  },
})

export const selectIsGame: (state: RootState) => boolean = (state: RootState) => state.game.isGame
export const selectPage: (state: RootState) => string = (state: RootState) => state.game.page
export const selectTurn: (state: RootState) => number = (state: RootState) => state.game.turn
export const selectWinner: (state: RootState) => string | undefined = (state: RootState) => state.game.winner
export const selectScreenPos: (state: RootState) => TileCoordProps = (state: RootState) => state.game.screenPos
export const selectPowerPool: (state: RootState) => number = (state: RootState) => state.game.powerPool
export const selectStartGold: (state: RootState) => number = (state: RootState) => state.game.startGold
export const selectColors: (state: RootState) => Array<string> = (state: RootState) => state.game.colors
export const selectRace: (state: RootState) => string = (state: RootState) => state.game.race

export const { changeIsGame, pageChange, turnCounter, setWinner, resetGameSlice,
  setScreenPos, setPowerPool, setStartGold, changeRace, changeColors } = gameSlice.actions

export default gameSlice.reducer