import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './store'
import { NetWork } from '../types'
import { SUPPORTED_NETWORKS } from '../constants'
import { ChainContract, useContract } from 'useink'
import metadata from "../metadata/usage_license_contract/usage_license_contract.json";

export interface AppState {
  network: NetWork,
}

const initialState: AppState = {
  network: SUPPORTED_NETWORKS[0],
}

export const appState = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<{ network: NetWork}>) => {
      state.network = action.payload.network;
    },
  }
})

export const { setNetwork } = appState.actions

export const selectNetwork = (state: RootState) => state.app_state.network

export default appState.reducer