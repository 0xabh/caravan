import React, { useEffect, useRef, useState } from 'react';
import { useBackgroundSelector } from '../../hooks';
import { getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';
import { Card, CardContent, Link, Radio, Switch, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { getEthereumGlobalProvider } from '../../../../helpers/getEthereumGlobal';
const SDAI_ABI = [{"inputs":[{"internalType":"address","name":"_daiJoin","type":"address"},{"internalType":"address","name":"_pot","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"asset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"convertToAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"convertToShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dai","outputs":[{"internalType":"contract DaiLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daiJoin","outputs":[{"internalType":"contract DaiJoinLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deploymentChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pot","outputs":[{"internalType":"contract PotLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vat","outputs":[{"internalType":"contract VatLike","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]
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
const getExplorerLink = (chainId: number) => {
  let link = '';
  switch (chainId) {
    case 137: // polygon
      link = 'https://polygonscan.com/';
      break;
    case 10: // optimism
      link = 'https://optimistic.etherscan.io/';
      break;
    case 80001: // mumbai
      link = 'https://mumbai.polygonscan.com/';
      break;
    case 534351: // scroll
      link = 'https://sepolia.scrollscan.dev/';
      break;
    case 11155111: // sepolia
      link = 'https://sepolia.etherscan.io/';
      break;
    case 5001: // mantle testnet
      link = 'https://explorer.testnet.mantle.xyz/';
      break;
    default:
      link = 'https://polygonscan.com/';
  }
  return link;
};

export const AssetDisplay = () => {
  const isInitialMount = useRef(true); // useRef to keep track of initial mount
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const exploereLink = getExplorerLink(parseInt(activeNetwork.chainID));
  const [sDaiBalance, setSDaiBalance] = useState('0');
  const assets = localStorage.getItem(activeNetwork.name)
    ? JSON.parse(localStorage.getItem(activeNetwork.name)!)
    : [];
  console.log('assets', assets);
  const [data, setData] = useState<
    {
      tokenName: string;
      tokenDecimals: string;
      tokenAddress: string;
      balance: string;
    }[]
  >();
    const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!assets) return;
      if (data) return;
      if (activeAccount && activeNetwork.chainID && activeNetwork.provider) {
        const provider = new ethers.providers.StaticJsonRpcProvider(
          activeNetwork.provider
        );
        const balances = await Promise.all(
          assets.map(async (asset: any) => {
            const contract = new ethers.Contract(
              asset.address,
              ['function balanceOf(address) view returns (uint)'],
              provider
            );
            const balance = await contract.balanceOf(activeAccount);
            console.log('activeAccount', activeAccount);
            const tokenName = asset.name;
            const tokenDecimals = asset.decimals;
            const tokenAddress = asset.address;
            return { tokenName, tokenDecimals, tokenAddress, balance };
          })
        );
        setData(balances);
      }
      const provider = getEthereumGlobalProvider();
      const sdaiContract = new ethers.Contract(
        '0x83F20F44975D03b1b09e64809B757c47f942BEeA',
        SDAI_ABI,
        provider
      );
      const sdaiBalance = await sdaiContract.balanceOf(activeAccount);
      setSDaiBalance(parseFloat(ethers.utils.formatUnits(sdaiBalance, 18)).toFixed(2));
    };
    fetchBalances();
  }, [assets,  sDaiBalance]);

  const checkAndDepositDai = async () => {
    const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // replace with actual DAI contract address
    // const provider = new ethers.providers.StaticJsonRpcProvider(
    //   activeNetwork.provider
    // );
    const provider = getEthereumGlobalProvider();
  const signer = provider.getSigner();

    const daiContract = new ethers.Contract(
      daiTokenAddress,
      ERC20_ABI,
      signer
    );

    const balance = await daiContract.balanceOf(activeAccount);
    const balanceInDai = parseFloat(
      ethers.utils.formatUnits(balance, 18) // assume DAI has 18 decimals
    );
      console.log('DAI Balance: ', balanceInDai)
      const sdaiContract = new ethers.Contract(
        '0x83F20F44975D03b1b09e64809B757c47f942BEeA',
        SDAI_ABI,
        signer
      );
      const sDaiBalance = await sdaiContract.balanceOf(activeAccount);
      console.log('sDai Balance: ', sDaiBalance)
      setSDaiBalance(parseFloat(ethers.utils.formatUnits(sDaiBalance, 18)).toFixed(2));
    if (balanceInDai >= 1) {
     
      await daiContract.approve(sdaiContract.address, ethers.utils.parseEther("100000"));
      console.log("DAI approved for sDai contract");
      await sdaiContract.deposit(balance, activeAccount);
      console.log("1 DAI deposited to sDai contract");
      const sdaiBalance = await sdaiContract.balanceOf(activeAccount);
      console.log('sDai Balance: ', sdaiBalance)
      setSDaiBalance(parseFloat(ethers.utils.formatUnits(sdaiBalance, 18)).toFixed(2));
    }
  };
  

  const withdrawSDai = async () => {
    // if(!checked) return;
    const provider = getEthereumGlobalProvider();
    const signer = provider.getSigner();
    const sdaiContract = new ethers.Contract(
      '0x83F20F44975D03b1b09e64809B757c47f942BEeA',
      SDAI_ABI,
      signer
    );
    const sDaiBalance = await sdaiContract.balanceOf(activeAccount);
    const balanceInSDai = parseFloat(
      ethers.utils.formatUnits(sDaiBalance, 18) // assume DAI has 18 decimals
    );
    if(balanceInSDai < 1) return;
    await sdaiContract.withdraw(sDaiBalance, activeAccount, activeAccount);
    console.log("sDAI withdrawn from sDai contract");
    const sdaiBalance = await sdaiContract.balanceOf(activeAccount);
    console.log('sDai Balance: ', sdaiBalance)
    setSDaiBalance(parseFloat(ethers.utils.formatUnits(sdaiBalance, 18)).toFixed(2));

  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Set it to false after first render
    } else {
      // This code block will not run on initial render
      if (checked) {
        checkAndDepositDai();
      } else {
        withdrawSDai();
      }
    }
  }, [checked]);


  return (
    <div>
      {/* <Typography variant='h6'>Transaction History</Typography> */}
      {data?.length === 0 && (
        <Typography variant="h6" sx={{ padding: '2px 3px' }}>
          No saved assets
        </Typography>
      )}
      {data && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px' }}>
            <Typography variant='h6'>Auto Deposit</Typography>
          <Switch onChange={() => { 
            setChecked(!checked)
           }} />
          </div>
          <div style={{ padding: '2px 4px'}}>
             sDAI Balance: ${sDaiBalance}
            </div>
          {data.map((asset, index) => {
            return (
              <Card key={index} sx={{ margin: '10px 0px' }}>
                <CardContent
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="subtitle1">
                    <Link
                      href={`${exploereLink}token/${asset.tokenAddress}`}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ textDecoration: 'none' }}
                    >
                      {asset.tokenName}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {parseFloat(
                      ethers.utils.formatUnits(
                        asset.balance,
                        parseInt(asset.tokenDecimals)
                      )
                    )}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
