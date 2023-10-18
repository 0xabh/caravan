import React, { useCallback, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { useBackgroundSelector } from '../App/hooks';
import {
  ProtectedRouteHasAccounts,
  ProtectedRouteKeyringUnlocked,
} from '../App/protected-route';
import { getAddressCount } from '../Background/redux-slices/selectors/accountSelectors';
import DappPermission from './pages/dapp-permission';
import Home from './pages/home';
import SignMessageRequest from './pages/sign-message';
import SignTransactionRequest from './pages/sign-transaction-request';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getActiveNetwork } from '../Background/redux-slices/selectors/networkSelectors';
import Config from '../../exconfig';
import {optimism, polygon, sepolia, polygonMumbai, scrollTestnet} from "viem/chains";
import {mantleTestnet} from "../App/app";
console.debug('---- LAUNCHING WITH CONFIG ----', Config);

const Popup = () => {
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  console.log("popup", activeNetwork)
  const hasAccounts = useBackgroundSelector(
    (state) => getAddressCount(state) > 0
  );

  const openExpandedView = useCallback(() => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({
      url,
    });
  }, []);

  useEffect(() => {
    if (!hasAccounts) {
      openExpandedView();
    }
  }, [hasAccounts, openExpandedView]);

  const wagmiConfig = useMemo(() => {
    // const provider = jso
    const {publicClient, webSocketPublicClient} = configureChains(
        [polygon, optimism, polygonMumbai, scrollTestnet, sepolia, mantleTestnet],
        [
          jsonRpcProvider({
            rpc: (chain) => {
              // console.log(chain)
              return {
                http: activeNetwork.provider,
              };
            },
          }),
        ]
    );
    // console.log(publicClient)
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
                <Home />
              </ProtectedRouteKeyringUnlocked>
            </ProtectedRouteHasAccounts>
          }
        />
        <Route
          path="/dapp-permission"
          element={
            <ProtectedRouteHasAccounts>
              <DappPermission />
            </ProtectedRouteHasAccounts>
          }
        />
        <Route
          path="/personal-sign"
          element={
            <ProtectedRouteHasAccounts>
              <SignMessageRequest />
            </ProtectedRouteHasAccounts>
          }
        />

        <Route
          path="/sign-transaction"
          element={
            <ProtectedRouteHasAccounts>
              <SignTransactionRequest />
            </ProtectedRouteHasAccounts>
          }
        />
      </Routes>
    </WagmiConfig>
  );
};

export default Popup;
