import React, { useCallback, useState, useEffect } from 'react';
import {
  Box, Card, CardContent, CircularProgress, Container,
  FormControl, FormGroup, InputAdornment, InputLabel, OutlinedInput,
  Typography, Checkbox, Select, MenuItem, Button
} from '@mui/material';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import getEthereumGlobal from '../../../../helpers/getEthereumGlobal';
import { getAccountEVMData, getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { useBackgroundSelector } from '../../hooks';
import Header from '../../components/header';
import { useNetworkContext } from '../../../../context/NetworkContext';
import { current } from '@reduxjs/toolkit';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';

const nativeTokenNames = (network: string) => {
  switch (network) {
    case 'Polygon':
      return 'MATIC';
    case 'Optimism':
      return 'OETH';
    case 'Mantle Testnet':
      return 'MNTL';
    default:
      return 'ETH';
  }
}

const setCustomTokens = (tokens: any, network: string) => {
  localStorage.setItem(network, JSON.stringify(tokens));
};
const getCustomTokens = (network: string) => {
    const tokens = localStorage.getItem(network);
    if(tokens != null) {
        return JSON.parse(tokens) || [];
    }else{
        return [];
    }
};

const NativeTransfer = () => {
  const navigate = useNavigate();
  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState('');
  const [tokenName, setTokenName] = useState('');
  const { selectedNetwork } = useNetworkContext();
  const [tokenAddress, setTokenAddress] = useState('');
  const [decimals, setDecimals] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [saveTokenEnabled, setSaveTokenEnabled] = useState(false);
  const [savedTokens, setSavedTokens]: any = useState([]);
  const [selectedToken, setSelectedToken] = useState({
    name: nativeTokenNames(selectedNetwork),
    address: '0x',
    decimals: 18,
  });
  const [tokenBalance, setTokenBalance] = useState('0.00'); // New
  const activeAccount: any = useBackgroundSelector(getActiveAccount);
  const activeNetwork: any = useBackgroundSelector(getActiveNetwork);
  const accountData: any = useBackgroundSelector((state: any) =>
    getAccountEVMData(state, {
      chainId: activeNetwork.chainID,
      address: activeAccount || '',
    })
  );

  useEffect(() => {
    console.log(selectedNetwork, 'selectedNetwork', [nativeTokenNames(selectedNetwork), ...getCustomTokens(selectedNetwork)])
    setSavedTokens([{name: nativeTokenNames(selectedNetwork), address: '0x', decimals: 18}, ...getCustomTokens(selectedNetwork)]);
  }, [selectedNetwork]);

  const sendToken = async () => {
    if (!ethers.utils.isAddress(toAddress)) {
      setError('Invalid to address');
      return;
    }
    setLoader(true);
    setError('');
    // required for cross chain only
    // const approvalTxHash = await sendApproval();
    // console.log(approvalTxHash);
    const ethereum = getEthereumGlobal();

    await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const method = '0xa9059cbb'; // transfer(address,uint256)

    // Convert the amount from ethers to its smallest unit
    const amountInSmallestUnit = ethers.utils.parseUnits(
      value.toString(),
      selectedToken.decimals
    );

    // Convert to hexadecimal and pad it
    const amountHex = amountInSmallestUnit
      .toHexString()
      .substring(2)
      .padStart(64, '0');

    // Prepare the data payload
    const data = `${method}${toAddress
      .substring(2)
      .padStart(64, '0')}${amountHex}`;
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: activeAccount,
          to:
          selectedToken.address,
          data,
        },
      ],
    });
    console.log(txHash);
    navigate('/');
    setLoader(false);
  };

  const fetchTokenBalance = async () => {
    const method = '0x70a08231'; // balanceOf(address)
    const data = `${method}${(activeAccount as string)
      .substring(2)
      .padStart(64, '0')}`;
    const ethereum = getEthereumGlobal();
    const balance = await ethereum.request({
      method: 'eth_call',
      params: [
        {
          to:
          selectedToken.address,
          data,
        },
        'latest',
      ],
    });
    console.log(balance, 'balance');
    const balanceInReadable = ethers.utils.formatUnits(
      balance,
      selectedToken.decimals
    );
    console.log(balanceInReadable, "balanceInReadable");
    setTokenBalance(balanceInReadable);
  };

  console.log('heres', selectedNetwork);
  useEffect(() => {
    // Fetch the balance of the selected token here.
    // For now, setting a placeholder balance.
    if(nativeTokenNames(selectedNetwork) == selectedToken.name) {
      setTokenBalance(accountData.balances[activeNetwork.baseAsset.symbol].assetAmount.amount);
    } else {
    fetchTokenBalance(); // Replace with actual call to fetch balance
    }
  }, [selectedToken]);

  const toggleSaveToken = () => {
    setSaveTokenEnabled(!saveTokenEnabled);
  };

  const sendEth = useCallback(async () => {
    if (!ethers.utils.isAddress(toAddress)) {
      setError('Invalid to address');
      return;
    }
    setLoader(true);
    setError('');

    const ethereum = getEthereumGlobal();

    await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: activeAccount,
          to: toAddress,
          data: '0x',
          value: ethers.utils.parseEther(value),
        },
      ],
    });
    console.log(txHash);
    navigate('/');
    setLoader(false);
  }, [activeAccount, navigate, toAddress, value]);
  
  const saveToken = useCallback(() => {
    const newToken = { name: tokenName, address: tokenAddress, decimals };
    const existingTokens: any = getCustomTokens(selectedNetwork);
    setCustomTokens([...existingTokens, newToken], selectedNetwork);
    setSavedTokens([...existingTokens, newToken]);
    setSaveTokenEnabled(false);  // New
  }, [tokenName, tokenAddress, decimals]);

  // const sendToken = useCallback(async () => {
  //   if(!ethers.utils.isAddress(toAddress)) {
  //     setError('Invalid to address');
  //     return;
  //   }
  //   setLoader(true);
  //   setError('');

  //   const ethereum = getEthereumGlobal();
  //   await ethereum.request({
  //     method: 'eth_requestAccounts',
  //   });
  //   const token = new ethers.Contract(
  //     selectedToken.address,
  //     [
  //       'function transfer(address to, uint256 value) public returns (bool success)',
  //     ],
  //     ethereum
  //   );
  //   const txHash = await token.transfer(toAddress, ethers.utils.parseUnits(value, decimals));
  //   console.log(txHash);
  //   // Your existing implementation to send tokens
  //   // Placeholder code to suppress warnings
  //   console.log(toAddress, value, selectedToken, navigate);
  // }, [toAddress, value, selectedToken, navigate]);

  return (
    <Container sx={{ width: '62vw', height: '100vh' }}>
      <Header />
      <Card sx={{ ml: 4, mr: 4, mt: 2, mb: 2 }}>
        
        <CardContent>
        <Box
            component="div"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.20)',
              position: 'relative',
            }}
          >
            <Typography variant="h6">Transfer</Typography>
          </Box>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4 }}
          >
        <FormGroup sx={{ p: 2, pt: 4 }}>
            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
              <InputLabel>Send To</InputLabel>
              <OutlinedInput
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                label="Send To"
              />
              
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
                <InputLabel>Value</InputLabel>
              <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                endAdornment={<InputAdornment position="end">{}</InputAdornment>}
                label="Value"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
              <InputLabel>Saved Tokens</InputLabel>
              <Select
  value={selectedToken || ''}
  onChange={(e) => {
    if (e.target && 'value' in e.target) {
      setSelectedToken(e.target.value as { name: string; address: string; decimals: number; });
    }
  }}
>
  { savedTokens.length > 0 && savedTokens.map((token: any, index: number) => {
    return <MenuItem key={index} value={token}>{token.name}</MenuItem>
  })}
</Select>

              <Typography variant="body2">{`Balance: ${tokenBalance}`}</Typography>  {/* New */}
            </FormControl>
            <Box display="flex" alignItems="center">
              <Checkbox checked={saveTokenEnabled} onChange={toggleSaveToken} />
              <Typography variant="body2">Enable Save Token</Typography>
            </Box>
            {saveTokenEnabled && (
              <>
                <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
                  <InputLabel>Token Name</InputLabel>
                  <OutlinedInput value={tokenName} onChange={(e) => setTokenName(e.target.value)} label="Token Name" />
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
                  <InputLabel>Token Address</InputLabel>
                  <OutlinedInput value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} label="Token Address" />
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }} variant="outlined">  {/* Width retained */}
                  <InputLabel>Decimals</InputLabel>
                  <OutlinedInput value={decimals} onChange={(e) => setDecimals(e.target.value)} label="Decimals" />
                </FormControl>
                <Button variant="contained" onClick={saveToken}>Save Token</Button>
              </>
            )}
            <Button variant="contained" onClick={nativeTokenNames(selectedNetwork) == selectedToken.name ? sendEth : sendToken} sx={{m:1, width: 300}}>
              Send
              {loader && <CircularProgress size={24} />}
            </Button>
          </FormGroup>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NativeTransfer;
