import { EthNetworkConfiguration } from "magic-sdk"

// Define Network enum that represents supported networks
export enum Network {
  Polygon = "Polygon",
  Optimism = "Optimism",
  Scroll = "Scroll",
  MantleTestnet = "Mantle Testnet",
  Sepolia = "Sepolia",
  Mumbai = "Mumbai",
}

// Function to return the network configuration based on the selected network.
export const formattedNetwork = (
  selectedNetwork: Network
): EthNetworkConfiguration => {
  switch (selectedNetwork) {
    case Network.Polygon:
      return {
        rpcUrl: "https://polygon.rpc.thirdweb.com",
        chainId: 137,
      }
    case Network.Optimism:
        return {
            rpcUrl: "https://optimism.rpc.thirdweb.com",
            chainId: 10,
        }
    case Network.Scroll:
        return {
            rpcUrl: "https://scroll-sepolia-testnet.rpc.thirdweb.com",
            chainId: 534351,
        }
    case Network.MantleTestnet:
        return {
            rpcUrl: "https://mantle-testnet.rpc.thirdweb.com",
            chainId: 5001,
        }
    case Network.Sepolia:
        return {
            rpcUrl: "https://sepolia.rpc.thirdweb.com",
            chainId: 11155111,
        }
    case Network.Mumbai:
        return {
            rpcUrl: "https://mumbai.rpc.thirdweb.com",
            chainId: 80001,
        }
    default:
        return {
            rpcUrl: "https://polygon.rpc.thirdweb.com",
            chainId: 137,
          }
  }
}