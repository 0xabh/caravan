import { createSlice } from '@reduxjs/toolkit';
import { EVMNetwork } from '../types/network';
import Config from '../../../exconfig';

export type Vault = {
  vault: string;
  encryptionKey?: string;
  encryptionSalt?: string;
};

export type NetworkState = {
  activeNetwork: EVMNetwork;
  supportedNetworks: Array<EVMNetwork>;
};


export const initialState: NetworkState = {
  activeNetwork: Config.network[1],
  supportedNetworks: Config.network as Array<EVMNetwork>,
};

type NetworkReducers = {};

const networkSlice = createSlice<NetworkState, NetworkReducers, 'network'>({
  name: 'network',
  initialState,
  reducers: {
    setActiveNetwork: (state: { activeNetwork: any; }, action: { payload: any; }) => {
      state.activeNetwork = action.payload; // Update the active network
    },
  },
});

export const { setActiveNetwork } = networkSlice.actions;

export default networkSlice.reducer;
