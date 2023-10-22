import { ethers } from "ethers"
import { ERC20_ABI } from "./sDai";

const SDAI_ABI = [{"inputs":[{"internalType":"address","name":"_daiJoin","type":"address"},{"internalType":"address","name":"_pot","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"asset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"convertToAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"convertToShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dai","outputs":[{"internalType":"contract DaiLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daiJoin","outputs":[{"internalType":"contract DaiJoinLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deploymentChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pot","outputs":[{"internalType":"contract PotLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vat","outputs":[{"internalType":"contract VatLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]



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
const UNISWAP_V3_ROUTER_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"}],"internalType":"struct ISwapRouter.ExactInputParams","name":"params","type":"tuple"}],"name":"exactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct ISwapRouter.ExactInputSingleParams","name":"params","type":"tuple"}],"name":"exactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"}],"internalType":"struct ISwapRouter.ExactOutputParams","name":"params","type":"tuple"}],"name":"exactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct ISwapRouter.ExactOutputSingleParams","name":"params","type":"tuple"}],"name":"exactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const swapEthForDaiV3 = async () => {
    const provider = new ethers.providers.JsonRpcProvider(`http://3.101.13.73:8545/`);
    const wallet = new ethers.Wallet("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", provider); // Replace YOUR_PRIVATE_KEY with your actual private key

    const uniswapV3Router = new ethers.Contract(
        "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 router address
        UNISWAP_V3_ROUTER_ABI,
        wallet
    );

    const amountIn = ethers.utils.parseEther("1"); // 0.1 ETH, change as needed
    const amountOutMinimum = 0; // you can set this to the minimum amount of DAI you expect to receive
    
    const recipient = wallet.address; // Set the recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    // Token addresses for WETH and DAI
    const tokenIn = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
    const tokenOut = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI

    const tx = await uniswapV3Router.exactInputSingle({
        tokenIn,
        tokenOut,
        fee: 3000, // Pool fee, can be 500, 3000, or 10000
        // recipient,
        recipient: '0x5cFFaa41fE36760E5bdE17FDbEAE6E3EE2A7d329',
        deadline,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96: 0 // can be left as zero
    }, {
        value: amountIn,
    });

    console.log("Transaction hash:", tx.hash);

    await tx.wait();
    console.log("Transaction confirmed");

    // await wallet.sendTransaction({
    //     to: '0x5cFFaa41fE36760E5bdE17FDbEAE6E3EE2A7d329',
    //     value: ethers.utils.parseEther("100")
    // });
    // await wallet.sendTransaction({
    //     to: '0x641A6160c7d02D727b3f5A94350f315f10Fe7507',
    //     value: ethers.utils.parseEther("100")
    // });
};

swapEthForDaiV3();