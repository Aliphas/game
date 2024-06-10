import { createMapData } from './../../actions/createMapData';
import { MapDataProps, MapSliceState, Tile } from './../../interfaces';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store"

const initialState: MapSliceState = {
  mapLength: 10,
  mapData: createMapData(10),
  activeTileId: undefined,
  tileSize: 80
}

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    changeMap: (state, action: PayloadAction<MapDataProps>) => {
      state.mapLength = Math.sqrt(action.payload.length)
      state.mapData = action.payload
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
    resetMapSlice: (state) => {
      state.mapLength = initialState.mapLength
      state.mapData = initialState.mapData
      state.activeTileId = initialState.activeTileId
    }
  }
})

export const selectMapLength: (state: RootState) => number = (state: RootState) => state.map.mapLength
export const selectMapData: (state: RootState) => MapDataProps = (state: RootState) => state.map.mapData
export const selectActiveTile = (state: RootState) => state.map.mapData.find((tile: Tile) =>
  tile.id === state.map.activeTileId)
export const selectTileSize: (state: RootState) => number = (state: RootState) => state.map.tileSize

export const { changeMap, changeActiveTileId, changeTileData, changeTileSize, resetMapSlice } = mapSlice.actions

export default mapSlice.reducer