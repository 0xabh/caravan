import {EVMNetwork} from './pages/Background/types/network';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    enablePasswordEncryption: false,
    showTransactionConfirmationScreen: true,
    factory_address: '0x510F02632863035EFaf1AD668798E097FfaE2e8b',
    stateVersion: '0.1',
    network: [
        {
            chainID: '137',
            family: 'EVM',
            name: 'Polygon',
            provider: 'https://polygon.rpc.thirdweb.com',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/137',
            baseAsset: {
                symbol: 'MATIC',
                name: 'MATIC',
                decimals: 18,
                image:
                    'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
            },
        } satisfies EVMNetwork,
        {
            chainID: '10',
            family: 'EVM',
            name: 'Optimism',
            provider: 'https://optimism.rpc.thirdweb.com',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/10',
            baseAsset: {
                symbol: 'ETH',
                name: 'ETH',
                decimals: 18,
                image:
                    'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
            },
        } satisfies EVMNetwork,
        {
            chainID: '80001',
            family: 'EVM',
            name: 'Mumbai',
            provider: 'https://mumbai.rpc.thirdweb.com',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/80001',
            baseAsset: {
                symbol: 'MATIC',
                name: 'MATIC',
                decimals: 18,
                image:
                    'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
            },
        } satisfies EVMNetwork,
        {
            chainID: '534351',
            family: 'EVM',
            name: 'Scroll',
            provider: 'https://scroll-sepolia-testnet.rpc.thirdweb.com',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/534351',
            baseAsset: {
                symbol: 'ETH',
                name: 'ETH',
                decimals: 18,
                image:
                    'https://chainlist.org/unknown-logo.png',
            },
        } satisfies EVMNetwork,
        {
            chainID: '11155111',
            family: 'EVM',
            name: 'Sepolia',
            provider: 'https://sepolia.rpc.thirdweb.com',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/11155111',
            baseAsset: {
                symbol: 'ETH',
                name: 'ETH',
                decimals: 18,
                image:
                    'https://chainlist.org/unknown-logo.png',
            },
        } satisfies EVMNetwork,
        {
            chainID: '5001',
            family: 'EVM',
            name: 'Mantle Testnet',
            provider: 'https://rpc.testnet.mantle.xyz',
            entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
            bundler: 'http://localhost:14337/5001',
            baseAsset: {
                symbol: 'MNT',
                name: 'MNT',
                decimals: 18,
                image:
                    'https://icons.llamao.fi/icons/chains/rsz_mantle.jpg',
            },
        } satisfies EVMNetwork,
    ],
};
