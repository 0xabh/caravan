import React, { useCallback } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StoreIcon from '@mui/icons-material/Store';
import {Avatar, Modal, Stack, Tooltip, Typography, useTheme} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';
import { Wallet, ethers } from 'ethers';
import { MUMBAI_RPC, TABLELAND } from '../../../Background/constants';

const TransferAssetButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <StoreIcon onClick={handleOpen} />
          </Avatar>
          <Modal open={false} onClose={handleClose}>
            <iframe
                src={`https://buy.onramper.com/?apiKey=pk_prod_01H4N57SYMDD0FMH2H8HQ5JPD3&isAmountEditable=true&isAddressEditable=true&themeName=light&containerColor=ffffffff&primaryColor=ff7a30f2&secondaryColor=ffffff&cardColor=ffe9deff&primaryTextColor=141519&secondaryTextColor=6b6f80&borderRadius=0.32&wgBorderRadius=1`}
                className="w-full"
                height="630px"
                title="Onramper widget"
                allow="accelerometer; autoplay; camera; gyroscope; payment"
            />
          </Modal>
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
