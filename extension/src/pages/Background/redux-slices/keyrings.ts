import {createSlice} from '@reduxjs/toolkit';
import {Keyring} from '../types/keyrings';
import {createBackgroundAsyncThunk} from './utils';
import KeyringService from '../services/keyring';
import {addNewAccount} from './account';
import {EVMNetwork} from "../types/network";

export type Vault = {
    vault: string;
    encryptionKey?: string;
    encryptionSalt?: string;
};

export type KeyringsState = {
    keyrings: Keyring[];
    importing: false | 'pending' | 'done';
    status: 'locked' | 'unlocked' | 'uninitialized';
    vault: Vault;
    keyringToVerify: {
        id: string;
        mnemonic: string[];
    } | null;
    passwordValidated: number;
};

export const initialState: KeyringsState = {
    keyrings: [],
    vault: {
        vault:
            '{"data":"Ukexw7sD847Dj98jjvGP+USD","iv":"+X2ZjepqanEDFIJneBDHcw==","salt":"LWHFdiZSZwESRu0M5vBaeLIBwszt8zclfbUH4h8tWFU="}',
        encryptionKey:
            '{"alg":"A256GCM","ext":true,"k":"SnGTN4MUv2Ugv7wy_dGvb-Tmz-CKNnMYbyBHIfUbYJg","key_ops":["encrypt","decrypt"],"kty":"oct"}',
        encryptionSalt: 'LWHFdiZSZwESRu0M5vBaeLIBwszt8zclfbUH4h8tWFU=',
    },
    importing: false,
    status: 'uninitialized',
    keyringToVerify: null,
    passwordValidated: 0
};

const keyringsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        keyringLocked: (state) => ({
            ...state,
            status: state.status !== 'uninitialized' ? 'locked' : 'uninitialized',
            vault: {
                vault: state.vault.vault,
            },
        }),
        keyringUnlocked: (state) => ({...state, status: 'unlocked'}),
        reinitializeKeyring: (state) => ({...state, status: 'uninitialized'}),
        vaultUpdate: (
            state,
            {
                payload: vault,
            }: {
                payload: Vault;
            }
        ) => ({
            ...state,
            vault,
            status:
                !vault.encryptionKey && state.status !== 'uninitialized'
                    ? 'locked'
                    : state.status,
        }),
        correctPassword: (state) => ({
            ...state,
            passwordValidated: 1,
        }),
        incorrectPassword: (state) => ({
            ...state,
            passwordValidated: 2,
        }),
        resetPasswordValidation: (state) => ({
            ...state,
            passwordValidated: 0,
        })
    },
});

export const {keyringLocked, vaultUpdate, keyringUnlocked, reinitializeKeyring, correctPassword, incorrectPassword, resetPasswordValidation} =
    keyringsSlice.actions;
export default keyringsSlice.reducer;

/**
 * -------------------------------
 * Background Actions
 * -------------------------------
 */

export const initializeKeyring = createBackgroundAsyncThunk(
    'keyring/initialize',
    async (password: string, {dispatch, extra: {mainServiceManager}}) => {
        const keyringService = mainServiceManager.getService(
            KeyringService.name
        ) as KeyringService;
        await keyringService.createPassword(password);
    }
);

export const validateUser = createBackgroundAsyncThunk(
    'keyring/validateUser',
    async (password: string, {dispatch, extra: {mainServiceManager}}) => {
        const keyringService = mainServiceManager.getService(
            KeyringService.name
        ) as KeyringService;
        const res = keyringService.validatePassword(password);
        console.log(res)
        if (res) {
            dispatch(correctPassword())
        } else {
            dispatch(incorrectPassword())
        }
    }
);

export const reinitializeKeyringThunk = createBackgroundAsyncThunk(
    'keyring/reinitialize',
    async (network: EVMNetwork, {dispatch, extra: {mainServiceManager}}) => {
        const keyringService = mainServiceManager.getService(
            KeyringService.name
        ) as KeyringService;
        // console.log(network.provider, network.bundler, network.chainID)
        await keyringService.reinitialize(network.provider, network.bundler!);
    });

export const createNewAccount = createBackgroundAsyncThunk(
    'keyring/createNewAccount',
    async (
        {
            name,
            implementation,
            context,
            chainIds,
        }: {
            name: string;
            chainIds: Array<string>;
            implementation: string;
            context?: any;
        },
        {dispatch, extra: {mainServiceManager}}
    ) => {
        const keyringService = mainServiceManager.getService(
            KeyringService.name
        ) as KeyringService;
        const address = await keyringService.addAccount(implementation, context);
        dispatch(
            addNewAccount({
                name,
                makeActive: true,
                chainIds: chainIds,
                address: address,
            })
        );
    }
);
