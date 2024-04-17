import { createMapData } from './../../actions/createMapData';
import { MapDataProps, MapSliceState, Tile } from './../../interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store"

const initialState: MapSliceState = {
  mapLength: 10,
  mapData: createMapData(10),
  activeTileId: undefined,
  tileSize: 70
}

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    changeMapLength: (state, action: PayloadAction<number>) => {
      state.mapLength = action.payload
    },
    changeActiveTileId: (state, action: PayloadAction<string | undefined>) => {
      state.activeTileId = action.payload
    },
    changeTileData: (state, action: PayloadAction<Tile>) => {
      const tile = state.mapData.find(tile => tile.id === action.payload.id)!
      tile.army = action.payload.army
      tile.owner = action.payload.owner
      tile.building = action.payload.building
    },
    changeTileSize: (state, action: PayloadAction<number>) => {
      state.tileSize = action.payload
    },
    resetMapSlice: () => initialState
  }
})

export const selectMapLength: (state: RootState) => number = (state: RootState) => state.map.mapLength
export const selectMapData: (state: RootState) => MapDataProps = (state: RootState) => state.map.mapData
export const selectActiveTile = (state: RootState) => state.map.mapData.find((tile: Tile) =>
  tile.id === state.map.activeTileId)
export const selectTileSize = (state: RootState) => state.map.tileSize

export const { changeMapLength, changeActiveTileId, changeTileData, resetMapSlice } = mapSlice.actions

export default mapSlice.reducer