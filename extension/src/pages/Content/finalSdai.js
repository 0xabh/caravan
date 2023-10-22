"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var SDAI_ABI = [{ "inputs": [{ "internalType": "address", "name": "_daiJoin", "type": "address" }, { "internalType": "address", "name": "_pot", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "assets", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "assets", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "asset", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "convertToAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }], "name": "convertToShares", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "dai", "outputs": [{ "internalType": "contract DaiLike", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daiJoin", "outputs": [{ "internalType": "contract DaiJoinLike", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deploymentChainId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }, { "internalType": "address", "name": "receiver", "type": "address" }], "name": "deposit", "outputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "maxDeposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "maxMint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "maxRedeem", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "maxWithdraw", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }, { "internalType": "address", "name": "receiver", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pot", "outputs": [{ "internalType": "contract PotLike", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }], "name": "previewDeposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "previewMint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }], "name": "previewRedeem", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }], "name": "previewWithdraw", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }, { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }], "name": "redeem", "outputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "vat", "outputs": [{ "internalType": "contract VatLike", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "assets", "type": "uint256" }, { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }], "name": "withdraw", "outputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }];
// const getMainnetProvider = new ethers.providers.JsonRpcProvider(
//     `http://127.0.0.1:8545/`
//   );
//   const obtainTokensAndPurchaseSdai = async () => {
//     const addressWithTokens = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";
//     const suhelAcc = '0x5cFFaa41fE36760E5bdE17FDbEAE6E3EE2A7d329';
//     // console.log("addressWithTokens", addressWithTokens);
//     // await getMainnetProvider.send("hardhat_setBalance", [
//     //     suhelAcc,
//     //     '0x43c33c193756488882'// set to a higher amount if needed
//     // ]);
//     // await getMainnetProvider.send("hardhat_setBalance", [
//     //     '0x641A6160c7d02D727b3f5A94350f315f10Fe7507',
//     //     '0x43c33c193756488882'// set to a higher amount if needed
//     // ]);
//     // const getMainnetProvider = new ethers.providers.JsonRpcProvider(
//     //     `http://3.101.13.73:8545`,
//     //   );
//     const getMainnetProvider = new ethers.providers.StaticJsonRpcProvider(
//         `http://http://3.101.13.73:8545/`
//     )
//       console.log(getMainnetProvider);
//     // // await getMainnetProvider.send("hardhat_impersonateAccount", [addressWithTokens]);
//     // await getMainnetProvider.send("hardhat_impersonateAccount", [addressWithTokens]);
//     // const impersonatedSigner = getMainnetProvider.getSigner(addressWithTokens);
//     const tokenContract = new ethers.Contract(
//         "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//         ERC20_ABI,
//         getMainnetProvider
//     );
//     // const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", getMainnetProvider);
//     // const etherBalance = await getMainnetProvider.getBalance(addressWithTokens);
//     // console.log("Ether Balance:", ethers.utils.formatEther(etherBalance));
//     // const tokenBalanceBefore = await tokenContract.balanceOf(addressWithTokens);
//     // console.log("Token Balance Before:", ethers.utils.formatUnits(tokenBalanceBefore, 18));
//     // if (tokenBalanceBefore.lt(ethers.utils.parseUnits("7", 18))) {
//     //     console.error("Insufficient token balance for transfer.");
//     //     return;
//     // }
//     // await impersonatedSigner.sendTransaction({
//     //     to: '0x5cFFaa41fE36760E5bdE17FDbEAE6E3EE2A7d329',
//     //     value: ethers.utils.parseEther("100")
//     // });
//     // await tokenContract.connect(impersonatedSigner).transfer('0x641A6160c7d02D727b3f5A94350f315f10Fe7507', "700000000000000000000", {
//     //     gasLimit: ethers.utils.hexlify(100000),  // gas limit
//     //     gasPrice: ethers.utils.parseUnits("20", "gwei")  // gas price in gwei
//     // });
//     // const tokenBalanceAfter = await tokenContract.balanceOf(wallet.address);
//     // console.log("Token Balance After:", ethers.utils.formatUnits(tokenBalanceAfter, 18));
//     // const sdaiContract = new ethers.Contract(
//     //     '0x83F20F44975D03b1b09e64809B757c47f942BEeA'
//     //     ,SDAI_ABI,
//     //     getMainnetProvider)
//     // await tokenContract.connect(wallet).approve('0x83F20F44975D03b1b09e64809B757c47f942BEeA', ethers.utils.parseEther('10000'), {
//     //     gasLimit: ethers.utils.hexlify(100000),  // gas limit
//     //     gasPrice: ethers.utils.parseUnits("20", "gwei")  // gas price in gwei
//     // });
//     // console.log("Approve done");
//     // await sdaiContract.connect(wallet).deposit(ethers.utils.parseEther("1"), wallet.address, {
//     //     // gasLimit: ethers.utils.hexlify(100000),  // gas limit
//     //     // gasPrice: ethers.utils.parseUnits("20", "gwei")  // gas price in gwei
//     // });
//     // const sdaiBalance = await sdaiContract.balanceOf(wallet.address);
//     // console.log("sDai Balance After:", ethers.utils.formatUnits(sdaiBalance, 18));
// };
// obtainTokensAndPurchaseSdai();
// ABI for Uniswap V3 Router
var UNISWAP_V3_ROUTER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH9", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH9", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" }], "internalType": "struct ISwapRouter.ExactInputParams", "name": "params", "type": "tuple" }], "name": "exactInput", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct ISwapRouter.ExactInputSingleParams", "name": "params", "type": "tuple" }], "name": "exactInputSingle", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMaximum", "type": "uint256" }], "internalType": "struct ISwapRouter.ExactOutputParams", "name": "params", "type": "tuple" }], "name": "exactOutput", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMaximum", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct ISwapRouter.ExactOutputSingleParams", "name": "params", "type": "tuple" }], "name": "exactOutputSingle", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "refundETH", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitAllowed", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitAllowedIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "feeBips", "type": "uint256" }, { "internalType": "address", "name": "feeRecipient", "type": "address" }], "name": "sweepTokenWithFee", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "int256", "name": "amount0Delta", "type": "int256" }, { "internalType": "int256", "name": "amount1Delta", "type": "int256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "uniswapV3SwapCallback", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "unwrapWETH9", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "feeBips", "type": "uint256" }, { "internalType": "address", "name": "feeRecipient", "type": "address" }], "name": "unwrapWETH9WithFee", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
var swapEthForDaiV3 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, wallet, uniswapV3Router, amountIn, amountOutMinimum, recipient, deadline, tokenIn, tokenOut, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                provider = new ethers_1.ethers.providers.JsonRpcProvider("http://3.101.13.73:8545/");
                wallet = new ethers_1.ethers.Wallet("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", provider);
                uniswapV3Router = new ethers_1.ethers.Contract("0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 router address
                UNISWAP_V3_ROUTER_ABI, wallet);
                amountIn = ethers_1.ethers.utils.parseEther("1");
                amountOutMinimum = 0;
                recipient = wallet.address;
                deadline = Math.floor(Date.now() / 1000) + 60 * 20;
                tokenIn = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
                tokenOut = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
                return [4 /*yield*/, uniswapV3Router.exactInputSingle({
                        tokenIn: tokenIn,
                        tokenOut: tokenOut,
                        fee: 3000,
                        // recipient,
                        recipient: '0x5cFFaa41fE36760E5bdE17FDbEAE6E3EE2A7d329',
                        deadline: deadline,
                        amountIn: amountIn,
                        amountOutMinimum: amountOutMinimum,
                        sqrtPriceLimitX96: 0 // can be left as zero
                    }, {
                        value: amountIn
                    })];
            case 1:
                tx = _a.sent();
                console.log("Transaction hash:", tx.hash);
                return [4 /*yield*/, tx.wait()];
            case 2:
                _a.sent();
                console.log("Transaction confirmed");
                return [2 /*return*/];
        }
    });
}); };
swapEthForDaiV3();
