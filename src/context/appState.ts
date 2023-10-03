import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './store'
import { NetWork } from '../types'
import { SUPPORTED_NETWORKS } from '../constants'
import { ChainContract, useContract } from 'useink'
import metadata from "../metadata/usage_license_contract/usage_license_contract.json";

export interface AppState {
  network: NetWork,
  contract: ChainContract | undefined
}

const initialState: AppState = {
  network: SUPPORTED_NETWORKS[0],
  contract: undefined
}

export const appState = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<{ network: NetWork; contract: ChainContract | undefined}>) => {
      state.network = action.payload.network;
      state.contract = action.payload.contract;
    },
  }
})

export const setNetworkAsync = (network: NetWork) => async (dispatch: AppDispatch) => {
  try {
    const contract = await useContract(network.contract_address, metadata);
    dispatch(setNetwork({ network, contract }));
  } catch (error) {
    // Handle errors if necessary
  }
};

export const { setNetwork } = appState.actions

export const selectNetwork = (state: RootState) => state.app_state.network

export default appState.reducer