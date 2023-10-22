# Caravan


## Cross Chain Account Abstraction Wallet Extension🚀

---
[Demo Video](https://youtu.be/SpghIaiVMAA)
---

## 📖 Introduction

- Welcome to the Caravan - Cross chain ERC 4337 compatible browser extensions Extension repository. This extension aims to deliver a seamless user experience for managing, transferring, and interacting with assets across multiple blockchain networks, all from a single interface. By abstracting away the complexities inherent in cross-chain operations.

---

## ♯ Description

- **Multi-Network Compatibility:** Caravan's browser-based wallet is engineered for compatibility with more than **7** blockchain networks. This functionality aims to simplify cross-chain transactions and reduce the complexity of managing multiple wallets, each tied to a specific network.

- **Smart Payment System:** Caravan's architecture accommodates transactions both with and without the involvement of paymasters. This flexibility allows users to opt for traditional transaction fee structures or to leverage subsidized fees, depending on their requirements.

- **Asset Management and Security:** Two key features distinguish Caravan's approach to asset management. First, a social recovery mechanism using OTP ensures that wallet access is recoverable across multiple devices. Second, an automated staking feature for DAI (sDAI) allows users to earn yield on idle assets, with the option for convenient conversion back to DAI.

#

---




# 👨‍💻Technologies / Protocols Used 🤖

Caravan leverages several cutting-edge technologies to offer a secure and seamless experience

### Tableland:
- Implemented Tableland to store all same-chain and cross-chain transactions. [Code Link](https://github.com/0xabh/caravan/blob/main/tableland/index.js)
- Studio team name:- Suhel / Caravan. 
- Dev Address:- 0xb7Bd02B95B13F3F0536BdCCb425D7086564B5fBA. [Tableland Table link](https://tablescan.io/tx_data_80001_7889)
### UMA's Across:
- To fecilitate fast and cheap cross-chain transfers across all 7 networks, we used accross's across bridge which is built on top of UMA's optimisic oracle.
- [Code Link](https://github.com/0xabh/caravan/blob/dfdc06bd046124e85e1aa2beeeb772e7f8cd89f7/extension/src/pages/App/pages/transfer-asset/transfer-asset.tsx#L4)
### Spark:

- We implemented Auto Deposit such that when the user is not using his funds, the idle liquidity can be used to earn yeild, which is why we used Spark's sDAI to fulfill this goal.
- [Code Link](https://github.com/0xabh/caravan/blob/dfdc06bd046124e85e1aa2beeeb772e7f8cd89f7/extension/src/pages/App/components/asset-display/AssetDisplay.tsx#L106)

### Scroll:
- Deployed our Contract Account and Verifying Paymaster on scroll to deploy ERC 4337 accounts and enable transactions.
- [Contract Account Scroll Etherscan Contract](https://sepolia-blockscout.scroll.io/address/0x510F02632863035EFaf1AD668798E097FfaE2e8b/contracts#address-tabs) and [Caravan Paymaster Contract Scroll Etherscan](https://sepolia-blockscout.scroll.io/address/0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4/contracts#address-tabs)
### Mantle Network:
- Deployed our Contract Account and Verifying Paymaster on Mantle Network to deploy ERC 4337 accounts and enable transactions.
- [Contract Account Contract on Mantle](https://explorer.testnet.mantle.xyz/address/0x510F02632863035EFaf1AD668798E097FfaE2e8b)
- [Caravan Paymaster Contract on Mantle](https://explorer.testnet.mantle.xyz/address/0x0cC3D5BfAa0eF5217Ec5f2Fa2F85d5AE2eb518E4)
- [Tweet Link](https://x.com/tejas_warambhe/status/1716080738460729715?s=20)

### Polygon:
Deployed our Contract Account and Verifying Paymaster on Polygon Mainnet and Testnet to deploy ERC 4337 accounts and enable transactions.
- [Contract Account Contract on Polygon Mainnet](https://polygonscan.com/address/0x510F02632863035EFaf1AD668798E097FfaE2e8b)
- [Caravan Paymaster Contract on Polygon Mainnet](https://polygonscan.com/address/0x8166E83E6C0C09A72891436341F89B450Cf219Bf)
- [Contract Account Contract on Mumbai Testnet](https://mumbai.polygonscan.com/address/0x510F02632863035EFaf1AD668798E097FfaE2e8b)
- [Caravan Paymaster Contract on Mumbai Testnet](https://mumbai.polygonscan.com/address/0x8166E83E6C0C09A72891436341F89B450Cf219Bf)
---

## Start Project:
## ⚙️  How to start Project

### 1. Start Bundler
Run with one-liner:

```sh
curl -fsSL https://skandha.run | bash
```
Or follow the steps below:

1. install all dependencies by running `yarn`
2. build `yarn build && yarn bootstrap`
3. `cp config.json.default config.json`
4. edit `config.json`
5. Export env variables of the networks that you want to support.
5. (optional) run local geth-node from `test/geth-dev`
6. run `./skandha`
7. Skandha will run for all chains available in `config.json`
8. Networks will be available at `http://localhost:14337/{chainId}/` (e.g. for dev `http://localhost:14337/1337/`)

- 

## 2. Start Tableland
### Steps:

1. `cd tableland`
2. `yarn` or `npm install`
3. Add `DB_PVT_KEY`, `OFFCHAIN_SIGNER_PRIVATE_KEY` and `ACCOUNT_OWNER_PRIVATE_KEY` in the `.env` file.
3. To start the server: `node index.js`

## 3. Start Extension
### Steps:

1. Verify that your [Node.js](https://nodejs.org/) version is >= **18.12.0**.
2. Clone this repository.
3. Make sure you configure the `provider` in `src/exconfig.ts` to the `Goerli` network.
4. Edit the `bundler` URL pointing to your preferred network(s) ( for example `goerli` and accepting EntryPoint=`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`
5. Run `yarn install` to install the dependencies.
6. Run `yarn start`
7. Load your extension in Chrome by following these steps:
   1. Go to `chrome://extensions/`
   2. Enable `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

> **Warning**
> Auto refresh is disabled by default, so you will have to manually refresh the page.
> If you make changes in background script or account-api, you will also have to refresh the background page. Check instructions on how to do that below.

> **Warning**
> Logs of all the blockchain interactions are shown in the background script. Do keep it open for faster debugging.

### How to see and refresh background page

1. Open extension's page: `chrome://extensions/`
2. Find the Trampoline extension, and click Details.
3. Check the `Inspect views` area and click on `background page` to inspect it's logs
4. To refresh click `cmd + r` or `ctrl + r` in the background inspect page to refresh the background script.
5. You can reload the extension completely too, the state is always kept in localstorage so nothing will be lost.

## Config

Config of the extension can be set in `exconfig.ts` file.

---

## 📄 License

This project is licensed under the MIT License - See the [LICENSE](./LICENSE) file for details.

## 🤝 Acknowledgements
- [Trampoline](https://github.com/eth-infinitism/trampoline) - Extension Base
- [etherspot/skandha](https://github.com/etherspot/skandha) - Bundler Base
- [Spark](https://sparkprotocol.co/home)
- [Tableland](https://tableland.xyz/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Polygon](https://polygon.technology/)
- [Scroll](https://scroll.io/)
- [Across](https://across.to/)
- [Mantle](https://www.mantle.xyz/)
- ETHOnline Team
