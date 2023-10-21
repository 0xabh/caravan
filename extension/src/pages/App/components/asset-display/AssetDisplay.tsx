import React, { useEffect, useState } from 'react';
import { useBackgroundSelector } from '../../hooks';
import { getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { ethers } from 'ethers';

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
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const exploereLink = getExplorerLink(parseInt(activeNetwork.chainID));
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
    };
    fetchBalances();
  }, [assets]);

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
