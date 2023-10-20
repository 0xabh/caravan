import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MagicNetwork, Network } from '../pages/Network';
import { useLocation } from 'react-router-dom';

// Define the context
type NetworkContextType = {
  network: MagicNetwork | null;
  updateMagicNetwork: (network: Network) => void;
  selectedNetwork: Network;
  magicNetwork: MagicNetwork | null;
};

// Create context with a default value
const NetworkContext = createContext<NetworkContextType>({
  network: MagicNetwork.create(Network.Polygon), // Default to Ethereum network
  updateMagicNetwork: () => {}, // Placeholder function, will be overwritten by provider
  selectedNetwork: Network.Polygon, // Default selected network to Ethereum
  magicNetwork: MagicNetwork.create(Network.Polygon), // Default to Ethereum network
});

// A custom hook to use context
export const useNetworkContext = () => useContext(NetworkContext);

// Provider component that wraps the app
export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Local state for selected network, default to Ethereum
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(
    Network.Polygon
  );

  // Local state for magic network instance
  const [magicNetwork, setMagicNetwork] = useState<MagicNetwork | null>(null);

  // A function to update our magic network instance based on the selected network
  const updateMagicNetwork = useCallback(async (network: Network) => {
    const magicNetwork = MagicNetwork.create(network);
    setMagicNetwork(magicNetwork);
    setSelectedNetwork(network);
  }, []);

  useEffect(() => {
    // Try to get network from local storage, or default to Ethereum
    const storedNetwork =
      (localStorage.getItem('network') as Network | null) || Network.Polygon;

    // Check if the previous route was '/accounts/new'
    if (location?.state?.from === '/accounts/new') {
      updateMagicNetwork(Network.Polygon);
    } else {
      updateMagicNetwork(storedNetwork);
    }
  }, [location, updateMagicNetwork]);

  return (
    <NetworkContext.Provider
      value={{
        network: magicNetwork,
        selectedNetwork,
        updateMagicNetwork,
        magicNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
