import {
  Box,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Checkbox,
  selectClasses,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  PreTransactionConfirmation,
  PreTransactionConfirmationtProps,
} from '../types';
import PrimaryButton from '../PrimaryButton';
import logo from '../../../../assets/img/caravanLogo.png';
import {useBackgroundSelector} from "../../../App/hooks"
import {getActiveNetwork} from "../../../Background/redux-slices/selectors/networkSelectors"

const AddPaymasterAndData = () => {
  return (
    <>
      <Typography variant="h6" sx={{ p: 2 }}>
        Paymaster Info
      </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Use Caravan's gas sponsorship to pay for the transaction using a verifying paymaster.
          </Typography>
        </Paper>
    </>
  );
};

const PreTransactionConfirmationComponent: PreTransactionConfirmation = ({
  onComplete,
  transaction,
  onReject,
}: PreTransactionConfirmationtProps) => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  console.log('activeNetwork', activeNetwork)
  const [paymasterAndData, setPaymasterAndDataLocal] = useState<boolean>(false);

  return (
    <>
      <CardContent className='flex flex-col justify-center items-center'>
      <Stack

        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ cursor: 'pointer' }}

      >
        <img height={60} width={60} src={logo} className="App-logo" alt="logo" />
        <Typography variant="h3" gutterBottom>
          Caravan
        </Typography>
      </Stack>
        {/* <Typography variant="body1" color="text.secondary">
          You can show as many steps as you want in this dummy component. You
          need to call the function <b>onComplete</b> passed as a props to this
          component. <br />
          <br />
          The function takes a modifiedTransactions & context as a parameter,
          the context will be passed to your AccountApi when creating a new
          account. While modifiedTransactions will be agreed upon by the user.
          <br />
          This Component is defined in exported in{' '}
        </Typography>
        <Typography variant="caption">
          trampoline/src/pages/Account/components/transaction/pre-transaction-confirmation.ts
        </Typography> */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <AddPaymasterAndData />
        </Box>
      </CardContent>
      <CardActions sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <PrimaryButton
            disabled={loader}
            sx={{ width: '95%' }}
            size="large"
            variant="outlined"
            onClick={() => {
              onComplete(transaction, { paymasterAndData: false });
              setLoader(true);
            }}
          >
            Continue Without Paymaster
            {loader && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </PrimaryButton>
          <PrimaryButton
            disabled={loader}
            sx={{ width: '95%' }}
            size="large"
            variant="contained"
            onClick={() => {
              onComplete(transaction, { paymasterAndData: true, chainId: activeNetwork.chainID });
              setLoader(true);
            }}
          >
            Continue With Paymaster
            {loader && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </PrimaryButton>
        </Stack>
      </CardActions>
    </>
  );
};

export default PreTransactionConfirmationComponent;