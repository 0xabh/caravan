import React, {useMemo} from 'react';
import {Route, Routes} from 'react-router-dom';
import {
    ProtectedRouteHasAccounts,
    ProtectedRouteKeyringUnlocked,
} from './protected-route';
import Home from './pages/home';
import Onboarding from './pages/onboarding';
import NewAccounts from './pages/new-accounts';
import {InitializeKeyring} from './pages/keyring';
import {WagmiConfig, configureChains, createConfig} from 'wagmi';
import {sepolia} from 'wagmi/chains';
import {useBackgroundSelector} from './hooks';
import {getActiveNetwork} from '../Background/redux-slices/selectors/networkSelectors';
import DeployAccount from './pages/deploy-account';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';
import '../Content/index';

import Config from '../../exconfig';
import TransferAsset from './pages/transfer-asset';
import {optimism, polygon, polygonMumbai, scrollTestnet} from "viem/chains";
import {defineChain} from "viem";

console.debug('---- LAUNCHING WITH CONFIG ----', Config);
export const mantleTestnet = /*#__PURE__*/ defineChain({
    id: 5001,
    name: 'Mantle Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'MNT',
        symbol: 'MNT',
    },
    network: 'mantle',
    rpcUrls: {
        default: { http: ['https://rpc.testnet.mantle.xyz'] },
        public: { http: ['https://rpc.testnet.mantle.xyz'] },
    },
    blockExplorers: {
        etherscan: {
            name: 'Mantle Testnet Explorer',
            url: 'https://explorer.testnet.mantle.xyz',
        },
        default: {
            name: 'Mantle Testnet Explorer',
            url: 'https://explorer.testnet.mantle.xyz',
        },
    },
    testnet: true,
})

const App = () => {
    const activeNetwork = useBackgroundSelector(getActiveNetwork);
    const wagmiConfig = useMemo(() => {
        // const provider = jso
        const {publicClient, webSocketPublicClient} = configureChains(
            [polygon, optimism, polygonMumbai, scrollTestnet, sepolia, mantleTestnet],
            [
                jsonRpcProvider({
                    rpc: (chain) => {
                        return {
                            http: activeNetwork.provider,
                        };
                    },
                }),
            ]
        );
        return createConfig({
            autoConnect: false,
            publicClient,
            webSocketPublicClient,
        });
    }, [activeNetwork.provider]);

    return (
        <WagmiConfig config={wagmiConfig}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRouteHasAccounts>
                            <ProtectedRouteKeyringUnlocked>
                                <Home/>
                            </ProtectedRouteKeyringUnlocked>
                        </ProtectedRouteHasAccounts>
                    }
                />
                <Route
                    path="/transfer-assets"
                    element={
                        <ProtectedRouteHasAccounts>
                            <ProtectedRouteKeyringUnlocked>
                                <TransferAsset/>
                            </ProtectedRouteKeyringUnlocked>
                        </ProtectedRouteHasAccounts>
                    }
                />
                <Route
                    path="/deploy-account"
                    element={
                        <ProtectedRouteHasAccounts>
                            <ProtectedRouteKeyringUnlocked>
                                <DeployAccount/>
                            </ProtectedRouteKeyringUnlocked>
                        </ProtectedRouteHasAccounts>
                    }
                />
                <Route
                    path="/accounts/new"
                    element={
                        <ProtectedRouteKeyringUnlocked>
                            <NewAccounts/>
                        </ProtectedRouteKeyringUnlocked>
                    }
                />
                <Route path="/keyring/initialize" element={<InitializeKeyring/>}/>
                <Route path="/onboarding/intro" element={<Onboarding/>}/>
            </Routes>
        </WagmiConfig>
    );
};

export default App;