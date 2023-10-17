import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import {HardhatUserConfig} from 'hardhat/config'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'
import "dotenv/config"

import 'solidity-coverage'

import * as fs from 'fs'

const mnemonicFileName = process.env.MNEMONIC_FILE ?? `${process.env.HOME}/.secret/testnet-mnemonic.txt`
let mnemonic = 'test '.repeat(11) + 'junk'
if (fs.existsSync(mnemonicFileName)) {
    mnemonic = fs.readFileSync(mnemonicFileName, 'ascii')
}

const optimizedComilerSettings = {
    version: '0.8.19',
    settings: {
        optimizer: {enabled: true, runs: 1000000},
        viaIR: true
    }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{
            version: '0.8.19',
            settings: {
                optimizer: {enabled: true, runs: 1000000}
            }
        }],
        overrides: {
            'contracts/core/EntryPoint.sol': optimizedComilerSettings,
            'contracts/samples/SimpleAccount.sol': optimizedComilerSettings
        }
    },
    networks: {
        polygon: {
            url: process.env.ALCHEMY_API_URL as string,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        },
        optimism: {
          url: process.env.INFURA_RPC_URL as string,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
        },
        mumbai: {
            url: process.env.ALCHEMY_MUMBAI_API_URL as string,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        },
        sepolia: {
            url: process.env.ALCHEMY_SEPOLIA_URL as string,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        },
        scrollSepolia: {
            url: "https://sepolia-rpc.scroll.io/",
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        },
        mantleTest: {
            url: "https://rpc.testnet.mantle.xyz", // testnet
            accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? '']
        },
        hardhat: {
            forking: {
                url: process.env.ALCHEMY_API_URL as string
            }
        }
    },
    mocha: {
        timeout: 10000
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY as string,
            scrollSepolia: process.env.SEPOLIA_API_KEY as string,
            mantleTest: process.env.MANTLE_API_KEY as string,
            polygonMumbai: process.env.POLYGON_API_KEY as string,
            optimism: process.env.OPTIMISM_API_KEY as string
        },
        customChains: [
            {
                network: "optimism",
                chainId: 10,
                urls: {
                    apiURL: "https://api-optimistic.etherscan.io/api",
                    browserURL: "https://optimistic.etherscan.io"
                }
            },
            {
                network: 'scrollSepolia',
                chainId: 534351,
                urls: {
                    apiURL: 'https://sepolia.scrollscan.dev/api',
                    browserURL: 'https://sepolia-blockscout.scroll.io/',
                },
            },
            {
                network: "mantleTest",
                chainId: 5001,
                urls: {
                    apiURL: "https://explorer.testnet.mantle.xyz/api",
                    browserURL: "https://explorer.testnet.mantle.xyz"
                }
            }
        ],
    },

}

// coverage chokes on the "compilers" settings
if (process.env.COVERAGE != null) {
    // @ts-ignore
    config.solidity = config.solidity.compilers[0]
}

export default config
