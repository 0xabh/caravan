import React, { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StoreIcon from '@mui/icons-material/Store';
import {
  Avatar,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';
import { Wallet, ethers } from 'ethers';
import { MUMBAI_RPC, TABLELAND } from '../../../Background/constants';
import CloseIcon from '@mui/icons-material/Close';

const TransferAssetButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
  };

  return (
    <Stack direction={'row'} spacing={4}>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={'4px'}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <StoreIcon onClick={handleOpen} />
        </Avatar>
        <Modal open={open} onClose={handleClose} style={modalStyle}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              position: 'relative',
            }}
          >
            <IconButton onClick={handleClose} sx={closeButtonStyle}>
              <CloseIcon />
            </IconButton>
            <iframe
              src={`https://buy.onramper.com/?apiKey=pk_prod_01H4N57SYMDD0FMH2H8HQ5JPD3&isAmountEditable=true&isAddressEditable=true&themeName=light&containerColor=ffffffff&primaryColor=ff7a30f2&secondaryColor=ffffff&cardColor=ffe9deff&primaryTextColor=141519&secondaryTextColor=6b6f80&borderRadius=0.32&wgBorderRadius=1`}
              className="w-full"
              height="630px"
              title="Onramper widget"
              allow="accelerometer; autoplay; camera; gyroscope; payment"
              style={{ width: '100%' }}
            />
          </div>
        </Modal>
        <Typography variant="button">Buy</Typography>
      </Stack>
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
          sx={{ cursor: 'pointer', opacity: 0.5 }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SwapHorizIcon />
          </Avatar>
          {/* <Modal open={open} onClose={handleClose} style={modalStyle}>
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                position: 'relative',
              }}
            >
              <IconButton onClick={handleClose} sx={closeButtonStyle}>
                <CloseIcon />
              </IconButton>
              <SwapWidget />
            </div>
          </Modal> */}
          <Typography variant="button">Swap</Typography>
        </Stack>
      </Tooltip>
    </Stack>
  );
};

export default TransferAssetButton;
