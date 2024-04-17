import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../features/start/gameSlice'
import mapReducer from '../features/map/mapSlice'
import playersReducer from '../features/players/playersSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    map: mapReducer,
    players: playersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch