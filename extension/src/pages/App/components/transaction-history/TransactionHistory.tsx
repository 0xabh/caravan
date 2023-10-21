import React, { useEffect, useState } from 'react';
import { useBackgroundSelector } from '../../hooks';
import { getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';
import { Card, CardContent, Link, Typography } from '@mui/material';

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

export const TransactionHistory = () => {
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const exploereLink = getExplorerLink(parseInt(activeNetwork.chainID));
  const [data, setData] = useState<
    {
      sender: string;
      receiver: string;
      value: string;
      hash: string;
      chainId: number;
      date: string;
    }[]
  >();

  useEffect(() => {
    const fetchTxn = async () => {
      if (activeAccount && activeNetwork.chainID) {
        const res = await fetch(
          `http://localhost:3003?sender=${activeAccount}&chainId=${activeNetwork.chainID}`
        );
        const data = await res.json();
        console.log(data);
        setData(data.results);
      }
    };
    fetchTxn();
  }, [activeAccount, activeNetwork]);

  return (
    <div>
      {/* <Typography variant='h6'>Transaction History</Typography> */}
      {data?.length === 0 && <Typography variant="h6" sx={{padding: "2px 3px"}}>No transactions yet</Typography>}
      {data && (
        <div>
          {data.reverse().map((txn, index) => {
            return (
              <Card key={index} sx={{ margin: '4px auto' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Receiver:{' '}
                    <Link
                      href={`${exploereLink}address/${txn.receiver}`}
                      target="_blank"
                      rel="noopener"
                    >{`${txn.receiver.slice(0, 4)}...${txn.receiver.slice(-4)}`}</Link>
                  </Typography>
                  <Typography sx={{fontSize: "13px"}} variant="body2" color="textSecondary">
                    Value: {txn.value} {activeNetwork.baseAsset.symbol}
                  </Typography>
                  <Typography sx={{fontSize: "13px"}} variant="body2" color="textSecondary">
                    Hash:{' '}
                    <Link
                      href={`${exploereLink}tx/${txn.hash}`}
                      target="_blank"
                      rel="noopener"
                    >{`${txn.hash.slice(0, 4)}...${txn.hash.slice(-4)}`}</Link>
                  </Typography>
                  <Typography sx={{fontSize: "13px"}} variant="body2" color="textSecondary">
                    Date: {new Date(txn.date).toLocaleString()}
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
