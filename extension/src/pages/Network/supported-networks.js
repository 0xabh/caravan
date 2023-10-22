"use strict";
exports.__esModule = true;
exports.formattedNetwork = exports.Network = void 0;
// Define Network enum that represents supported networks
var Network;
(function (Network) {
    Network["Polygon"] = "Polygon";
    Network["Optimism"] = "Optimism";
    Network["Scroll"] = "Scroll";
    Network["MantleTestnet"] = "Mantle Testnet";
    Network["Sepolia"] = "Sepolia";
    Network["Mumbai"] = "Mumbai";
    Network["ETHLocalhost"] = "ETHLocalhost";
})(Network = exports.Network || (exports.Network = {}));
// Function to return the network configuration based on the selected network.
var formattedNetwork = function (selectedNetwork) {
    switch (selectedNetwork) {
        case Network.Polygon:
            return {
                rpcUrl: "https://polygon.rpc.thirdweb.com",
                chainId: 137
            };
        case Network.Optimism:
            return {
                rpcUrl: "https://optimism.rpc.thirdweb.com",
                chainId: 10
            };
        case Network.Scroll:
            return {
                rpcUrl: "https://scroll-sepolia-testnet.rpc.thirdweb.com",
                chainId: 534351
            };
        case Network.MantleTestnet:
            return {
                rpcUrl: "https://mantle-testnet.rpc.thirdweb.com",
                chainId: 5001
            };
        case Network.Sepolia:
            return {
                rpcUrl: "https://sepolia.rpc.thirdweb.com",
                chainId: 11155111
            };
        case Network.Mumbai:
            return {
                rpcUrl: "https://mumbai.rpc.thirdweb.com",
                chainId: 80001
            };
        case Network.ETHLocalhost:
            return {
                rpcUrl: "http://3.101.13.73:8545",
                chainId: 31337
            };
        default:
            return {
                rpcUrl: "https://polygon.rpc.thirdweb.com",
                chainId: 137
            };
    }
};
exports.formattedNetwork = formattedNetwork;
