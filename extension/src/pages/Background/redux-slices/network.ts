import {createSlice} from '@reduxjs/toolkit';
import {EVMNetwork} from '../types/network';
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
    activeNetwork: Config.network[0],
    supportedNetworks: Config.network as Array<EVMNetwork>,
};


const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setActiveNetwork: (state: { activeNetwork: any; }, action: { payload: any; }) => {
            state.activeNetwork = action.payload; // Update the active network
        },
    },
});

export const {setActiveNetwork} = networkSlice.actions;

export default networkSlice.reducer;
