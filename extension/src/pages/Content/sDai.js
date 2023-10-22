"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.executeRoute = exports.getTokenTransferApproval = exports.generateRoutePrice = exports.toReadableAmount = exports.fromReadableAmount = exports.TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = exports.MAX_PRIORITY_FEE_PER_GAS = exports.MAX_FEE_PER_GAS = exports.WETH_ABI = exports.ERC20_ABI = exports.WETH_TOKEN = exports.DAI_TOKEN = exports.USDC_TOKEN = exports.WETH_CONTRACT_ADDRESS = exports.V3_SWAP_ROUTER_ADDRESS = void 0;
var smart_order_router_1 = require("@uniswap/smart-order-router");
var sdk_core_1 = require("@uniswap/sdk-core");
var jsbi_1 = require("jsbi");
var ethers_1 = require("ethers");
// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's
var sdk_core_2 = require("@uniswap/sdk-core");
// Addresses
exports.V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
exports.WETH_CONTRACT_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
// Currencies and Tokens
exports.USDC_TOKEN = new sdk_core_1.Token(sdk_core_2.SupportedChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC', 'USD//C');
exports.DAI_TOKEN = new sdk_core_1.Token(sdk_core_2.SupportedChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
exports.WETH_TOKEN = new sdk_core_1.Token(sdk_core_2.SupportedChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether');
var tokenIn = new sdk_core_1.Token(sdk_core_2.SupportedChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether');
var tokenOut = new sdk_core_1.Token(sdk_core_2.SupportedChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
// ABI's
exports.ERC20_ABI = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    // Authenticated Functions
    'function transfer(address to, uint amount) returns (bool)',
    'function approve(address _spender, uint256 _value) returns (bool)',
    // Events
    'event Transfer(address indexed from, address indexed to, uint amount)',
];
exports.WETH_ABI = [
    // Wrap ETH
    'function deposit() payable',
    // Unwrap ETH
    'function withdraw(uint wad) public',
];
// Transactions
exports.MAX_FEE_PER_GAS = 100000000000;
exports.MAX_PRIORITY_FEE_PER_GAS = 100000000000;
exports.TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 10000;
var getMainnetProvider = new ethers_1.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
/* These functions are helpful for conversions of big int which arrive as fractions (numerator and denominator)*/
// Takes in the amount and decimals and returns in the JSBI format (Big Int)
function fromReadableAmount(amount, decimals) {
    var extraDigits = ethers_1.BigNumber.from(10).pow(countDecimals(amount));
    var adjustedAmount = ethers_1.BigNumber.from(Math.floor(amount * Number(extraDigits)));
    return adjustedAmount.mul(ethers_1.BigNumber.from(10).pow(decimals)).div(extraDigits);
}
exports.fromReadableAmount = fromReadableAmount;
// Converts to readable form using rawAmount and decimals
function toReadableAmount(rawAmount, decimals) {
    return jsbi_1["default"].divide(jsbi_1["default"].BigInt(rawAmount), jsbi_1["default"].exponentiate(jsbi_1["default"].BigInt(10), jsbi_1["default"].BigInt(decimals))).toString();
}
exports.toReadableAmount = toReadableAmount;
// Counts decimals
function countDecimals(x) {
    if (Math.floor(x) === x) {
        return 0;
    }
    return x.toString().split('.')[1].length || 0;
}
// Generates a route's prive using the uniswap's dex aggregation
function generateRoutePrice(tokenIn, tokenOut, getMainnetProvider) {
    return __awaiter(this, void 0, void 0, function () {
        var getMainnetProvider2, router, amountIn, route;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getMainnetProvider2 = new ethers_1.ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/5c84d331847b4bf9b4966adaf7907c05");
                    router = new smart_order_router_1.AlphaRouter({
                        chainId: smart_order_router_1.ChainId.MAINNET,
                        provider: getMainnetProvider2
                    });
                    amountIn = sdk_core_1.CurrencyAmount.fromRawAmount(tokenIn, // currency in
                    fromReadableAmount(1, // currency in amount
                    tokenIn.decimals // currency in decimals
                    ).toString());
                    return [4 /*yield*/, router.route(amountIn, tokenOut, sdk_core_1.TradeType.EXACT_INPUT // Kind of trade -> EXACT_INPUT or EXACT_OUTPUT
                        )];
                case 1:
                    route = _a.sent();
                    return [2 /*return*/, route];
            }
        });
    });
}
exports.generateRoutePrice = generateRoutePrice;
function getTokenTransferApproval(token) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, address, tokenContract, transaction, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = getMainnetProvider;
                    address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    tokenContract = new ethers_1.ethers.Contract(token.address, exports.ERC20_ABI, provider);
                    return [4 /*yield*/, tokenContract.populateTransaction.approve(exports.V3_SWAP_ROUTER_ADDRESS, fromReadableAmount(1000, 18).toString())];
                case 2:
                    transaction = _a.sent();
                    return [2 /*return*/, sendTransactionViaWallet(__assign(__assign({}, transaction), { from: address, maxFeePerGas: exports.MAX_FEE_PER_GAS, maxPriorityFeePerGas: exports.MAX_PRIORITY_FEE_PER_GAS }))];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTokenTransferApproval = getTokenTransferApproval;
// const swapToken = async () => {
//     const route = await generateRoutePrice(tokenIn, tokenOut, getMainnetProvider);
//     console.log(route);
//     const tokenApproval = await getTokenTransferApproval(tokenIn)
// }
function executeRoute(route) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var walletAddress, provider, res;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
                    provider = getMainnetProvider;
                    if (!walletAddress || !provider) {
                        throw new Error('Cannot execute a trade without a connected wallet');
                    }
                    return [4 /*yield*/, sendTransactionViaWallet({
                            data: (_a = route.methodParameters) === null || _a === void 0 ? void 0 : _a.calldata,
                            to: exports.V3_SWAP_ROUTER_ADDRESS,
                            value: (_b = route === null || route === void 0 ? void 0 : route.methodParameters) === null || _b === void 0 ? void 0 : _b.value,
                            from: walletAddress,
                            maxFeePerGas: exports.MAX_FEE_PER_GAS,
                            maxPriorityFeePerGas: exports.MAX_PRIORITY_FEE_PER_GAS
                        })];
                case 1:
                    res = _c.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.executeRoute = executeRoute;
function sendTransactionViaWallet(transaction) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, wallet, txRes, receipt, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = getMainnetProvider;
                    if (transaction.value) {
                        transaction.value = ethers_1.BigNumber.from(transaction.value);
                    }
                    wallet = new ethers_1.ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
                    return [4 /*yield*/, wallet.sendTransaction(transaction)];
                case 1:
                    txRes = _a.sent();
                    receipt = null;
                    _a.label = 2;
                case 2:
                    if (!(receipt === null)) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, provider.getTransactionReceipt(txRes.hash)];
                case 4:
                    receipt = _a.sent();
                    if (receipt === null) {
                        return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _a.sent();
                    console.log("Receipt error:", e_2);
                    return [3 /*break*/, 7];
                case 6: return [3 /*break*/, 2];
                case 7:
                    if (receipt) {
                        console.log(receipt);
                        console.log("Transaction mined in block ".concat(receipt.blockNumber));
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var wrapETH = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var wethContract, transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wethContract = new ethers_1.ethers.Contract(exports.WETH_CONTRACT_ADDRESS, exports.WETH_ABI, getMainnetProvider);
                transaction = {
                    to: exports.WETH_CONTRACT_ADDRESS,
                    value: amount.toString(),
                    data: wethContract.interface.encodeFunctionData('deposit')
                };
                return [4 /*yield*/, sendTransactionViaWallet(transaction)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var swapToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var wethContract, wethBalance, route, tokenApproval, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // first wrap the eth
            return [4 /*yield*/, wrapETH(ethers_1.BigNumber.from(10).pow(21))];
            case 1:
                // first wrap the eth
                _a.sent();
                wethContract = new ethers_1.ethers.Contract(exports.WETH_CONTRACT_ADDRESS, exports.ERC20_ABI, getMainnetProvider);
                return [4 /*yield*/, wethContract.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')];
            case 2:
                wethBalance = _a.sent();
                console.log('ETH Balance', wethBalance.toString());
                return [4 /*yield*/, generateRoutePrice(tokenIn, tokenOut, getMainnetProvider)];
            case 3:
                route = _a.sent();
                console.log(route);
                return [4 /*yield*/, getTokenTransferApproval(tokenIn)];
            case 4:
                tokenApproval = _a.sent();
                console.log('Token approval done', tokenApproval);
                if (!route) return [3 /*break*/, 6];
                return [4 /*yield*/, executeRoute(route)];
            case 5:
                res = _a.sent();
                console.log(res);
                return [3 /*break*/, 7];
            case 6:
                console.log('Route not found');
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
swapToken();
