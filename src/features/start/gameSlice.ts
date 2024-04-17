import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GameState, TileCoordProps } from "../../interfaces"
import { RootState } from "../../redux/store"

const initialState: GameState = {
  value: true,
  page: "menu",
  turn: 1,
  powerPool: 50,
  startGold: 50,
  winner: undefined,
  colors: ["red", "blue", "green", "orange", "purple", "cyan", "brown", "gold", "silver"],
  screenPos: {
    w: 0,
    h: 0
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

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
    addColor: (state, action: PayloadAction<string>) => {
      state.colors.push(action.payload)
    },
    resetGameSlice: () => initialState
  },
})

export const selectPage: (state: RootState) => string = (state: RootState) => state.game.page
export const selectTurn: (state: RootState) => number = (state: RootState) => state.game.turn
export const selectWinner: (state: RootState) => string | undefined = (state: RootState) => state.game.winner
export const selectScreenPos: (state: RootState) => TileCoordProps = (state: RootState) => state.game.screenPos
export const selectPowerPool: (state: RootState) => number = (state: RootState) => state.game.powerPool
export const selectStartGold: (state: RootState) => number = (state: RootState) => state.game.startGold
export const selectColors: (state: RootState) => Array<string> = (state: RootState) => state.game.colors

export const { pageChange, turnCounter, setWinner, resetGameSlice,
  setScreenPos, setPowerPool, setStartGold } = gameSlice.actions

export default gameSlice.reducer