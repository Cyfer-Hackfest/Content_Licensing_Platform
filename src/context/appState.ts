import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { NetWork } from '../types'
import { SUPPORTED_NETWORKS } from '../constants'

// Define a type for the slice state
export interface AppState {
  network: NetWork
}

// Define the initial state using that type
const initialState: AppState = {
  network: SUPPORTED_NETWORKS[0]
}

export const appState = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<NetWork>) => {
      state.network = action.payload
    },
  }
})

export const { setNetwork } = appState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNetwork = (state: RootState) => state.app_state.network

export default appState.reducer