import { EVMNetwork } from './pages/Background/types/network';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  enablePasswordEncryption: false,
  showTransactionConfirmationScreen: true,
  factory_address: '0x510F02632863035EFaf1AD668798E097FfaE2e8b',
  stateVersion: '0.1',
  network: {
    chainID: '11155111',
    family: 'EVM',
    name: 'Mumbai',
    provider: 'https://polygon-mumbai.g.alchemy.com/v2/JvKe-Xwg-9H1v7-lCQ80PaVzsppRi2WI',
    entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    bundler: 'http://localhost:14337/80001',
    baseAsset: {
      symbol: 'MATIC',
      name: 'MATIC',
      decimals: 18,
      image:
        'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/6ed5f/eth-diamond-black.webp',
    },
  } satisfies EVMNetwork,
};
