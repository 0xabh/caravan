import React, { useCallback } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StoreIcon from '@mui/icons-material/Store';
import { Avatar, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';
import { Wallet, ethers } from 'ethers';
import { MUMBAI_RPC, TABLELAND } from '../../../Background/constants';
import { Database } from '@tableland/sdk';
import env from "../../../../../utils/env.js";

const TransferAssetButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const test = async () => {
    const res = await fetch("http://localhost:3003/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: "sender",
        receiver: "receiver", 
        hash: "hash", 
        value: "valye", 
        date: new Date().toISOString(),
      }),
    })
    console.log(res)
    return 'receipt';
  };

  return (
    <Stack direction={'row'} spacing={4}>
      <Tooltip title="Coming soon">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={'4px'}
          sx={{ cursor: 'pointer' }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <StoreIcon onClick={test} />
          </Avatar>
          <Typography variant="button">Buy</Typography>
        </Stack>
      </Tooltip>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={'4px'}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <SendRoundedIcon
            onClick={() => navigate('/transfer-assets')}
            sx={{ transform: 'rotate(-45deg)', ml: '4px', mb: '6px' }}
          />
        </Avatar>
        <Typography variant="button">Send</Typography>
      </Stack>
      <Tooltip title="Coming soon">
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={'4px'}
          sx={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SwapHorizIcon />
          </Avatar>
          <Typography variant="button">Swap</Typography>
        </Stack>
      </Tooltip>
    </Stack>
  );
};

export default TransferAssetButton;
