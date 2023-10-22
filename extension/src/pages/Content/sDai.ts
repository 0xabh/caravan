import { AlphaRouter, ChainId, SwapRoute } from '@uniswap/smart-order-router';
import { TradeType, CurrencyAmount, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { BigNumber, ethers } from 'ethers';
// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId } from '@uniswap/sdk-core';
import { TransactionState } from '../Background/redux-slices/transactions';

// Addresses

export const V3_SWAP_ROUTER_ADDRESS =
  '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
export const WETH_CONTRACT_ADDRESS =
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

// Currencies and Tokens

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
);

export const DAI_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
);

export const WETH_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);
const tokenIn = new Token(
  SupportedChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);
const tokenOut = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
);
// ABI's

export const ERC20_ABI = [
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

export const WETH_ABI = [
  // Wrap ETH
  'function deposit() payable',

  // Unwrap ETH
  'function withdraw(uint wad) public',
];

// Transactions

export const MAX_FEE_PER_GAS = 100000000000;
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000;
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 10000;
const getMainnetProvider = new ethers.providers.JsonRpcProvider(
  `http://127.0.0.1:8545/`
);

/* These functions are helpful for conversions of big int which arrive as fractions (numerator and denominator)*/

// Takes in the amount and decimals and returns in the JSBI format (Big Int)
export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumber {
  const extraDigits = BigNumber.from(10).pow(countDecimals(amount));
  const adjustedAmount = BigNumber.from(
    Math.floor(amount * Number(extraDigits))
  );
  return adjustedAmount.mul(BigNumber.from(10).pow(decimals)).div(extraDigits);
}

// Converts to readable form using rawAmount and decimals
export function toReadableAmount(rawAmount: number, decimals: number): string {
  return JSBI.divide(
    JSBI.BigInt(rawAmount),
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
  ).toString();
}

// Counts decimals
function countDecimals(x: number) {
  if (Math.floor(x) === x) {
    return 0;
  }
  return x.toString().split('.')[1].length || 0;
}
export interface IRoutePriceOutput {
  tokenOut: string | undefined;
  tokenIn: string | undefined;
  price: string | undefined;
  tokenInAddress: string;
  tokenOutAddress: string;
}
// Generates a route's prive using the uniswap's dex aggregation
export async function generateRoutePrice(
  tokenIn: Token,
  tokenOut: Token,
  getMainnetProvider: any
) {
  const getMainnetProvider2 = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/5c84d331847b4bf9b4966adaf7907c05`
  );
  // AlphaRouter is created with chain and provider as Polygon Mainnet
  const router = new AlphaRouter({
    chainId: ChainId.MAINNET,
    provider: getMainnetProvider2,
  });

  // The amountIn is of type CurrencyAmount
  const amountIn = CurrencyAmount.fromRawAmount(
    tokenIn, // currency in
    fromReadableAmount(
      1, // currency in amount
      tokenIn.decimals // currency in decimals
    ).toString()
  );

  // Route is created for the two Tokens
  const route = await router.route(
    amountIn,
    tokenOut,
    TradeType.EXACT_INPUT // Kind of trade -> EXACT_INPUT or EXACT_OUTPUT
  );

  return route;
}

export async function getTokenTransferApproval(token: Token) {
  const provider = getMainnetProvider;
  const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  try {
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    );

    const transaction = await tokenContract.populateTransaction.approve(
      V3_SWAP_ROUTER_ADDRESS,
      fromReadableAmount(1000, 18).toString()
    );

    return sendTransactionViaWallet({
      ...transaction,
      from: address,
      maxFeePerGas: MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    });
  } catch (e) {
    console.error(e);
    return false;
  }
}
// const swapToken = async () => {
//     const route = await generateRoutePrice(tokenIn, tokenOut, getMainnetProvider);
//     console.log(route);
//     const tokenApproval = await getTokenTransferApproval(tokenIn)
// }

export async function executeRoute(route: SwapRoute) {
  const walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const provider = getMainnetProvider;

  if (!walletAddress || !provider) {
    throw new Error('Cannot execute a trade without a connected wallet');
  }

  // Fail if transfer approvals do not go through

  const res = await sendTransactionViaWallet({
    data: route.methodParameters?.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: route?.methodParameters?.value,
    from: walletAddress,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
  });

  return res;
}

async function sendTransactionViaWallet(
  transaction: ethers.providers.TransactionRequest
) {
  const provider = getMainnetProvider;

  if (transaction.value) {
    transaction.value = BigNumber.from(transaction.value);
  }
  const wallet = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  );

  const txRes = await wallet.sendTransaction(transaction);

  let receipt = null;

  while (receipt === null) {
    try {
      receipt = await provider.getTransactionReceipt(txRes.hash);

      if (receipt === null) {
        continue;
      }
    } catch (e) {
      console.log(`Receipt error:`, e);
      break;
    }
  }

  if (receipt) {
    console.log(receipt);
    console.log(`Transaction mined in block ${receipt.blockNumber}`);
  } else {
    return false;
  }
}
const wrapETH = async (amount: BigNumber) => {
  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    WETH_ABI,
    getMainnetProvider
  );

  const transaction = {
    to: WETH_CONTRACT_ADDRESS,
    value: amount.toString(),
    data: wethContract.interface.encodeFunctionData('deposit'),
  };

  return await sendTransactionViaWallet(transaction);
};

const swapToken = async () => {
  // first wrap the eth
  await wrapETH(BigNumber.from(10).pow(21));

  const wethContract = new ethers.Contract(
    WETH_CONTRACT_ADDRESS,
    ERC20_ABI,
    getMainnetProvider
  );
  const wethBalance = await wethContract.balanceOf(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  );
  console.log('ETH Balance', wethBalance.toString());

  const route = await generateRoutePrice(tokenIn, tokenOut, getMainnetProvider);
  console.log(route);
  const tokenApproval = await getTokenTransferApproval(tokenIn);
  console.log('Token approval done', tokenApproval);
  if (route) {
    const res = await executeRoute(route);
    console.log(res);
  } else {
    console.log('Route not found');
  }
};

swapToken();
