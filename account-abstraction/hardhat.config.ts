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
            url: "https://polygon-mainnet.g.alchemy.com/v2/2V1Qd3Tu2iZHc_VZpYeclZNdnuaKDqSw",
            accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        },
        mumbai: {
            url: "https://polygon-mumbai.g.alchemy.com/v2/kREbvoL5IerxCOHupKw6nZcjBVqHvmEy",
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
                url: 'https://polygon-mumbai.g.alchemy.com/v2/kREbvoL5IerxCOHupKw6nZcjBVqHvmEy'
            }
        }
    },
    mocha: {
        timeout: 10000
    },
    etherscan: {
        apiKey: {
            scrollSepolia: '2VTTTVXZJD7I6HSM2HPQINJQR6VJTDFIJH',
            // mantleTest: '2VTTTVXZJD7I6HSM2HPQINJQR6VJTDFIJH',
            // polygonMumbai: "6RVSNVADVHISVKT9EUX37P8YGHWGH3P1DX",
            // mumbai: "6RVSNVADVHISVKT9EUX37P8YGHWGH3P1DX"
        },
        customChains: [
            {
                network: 'scrollSepolia',
                chainId: 534351,
                urls: {
                    apiURL: 'https://sepolia-blockscout.scroll.io/api',
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
