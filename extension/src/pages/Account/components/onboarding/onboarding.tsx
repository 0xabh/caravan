import {
  Box,
  CardActions,
  CardContent,
  CircularProgress,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import {
  EmailComponent,
  EmailComponentProps,
  OnboardingComponent,
  OnboardingComponentProps,
} from '../types';
import PrimaryButton from '../PrimaryButton';
import { useUserContext } from '../../../../context/UserContext';
import { useNetworkContext } from '../../../../context/NetworkContext';

const Onboarding: EmailComponent = ({ nextStage }: EmailComponentProps) => {
  const [email, setEmail] = React.useState<string>('');
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const { fetchUserInfo } = useUserContext();
  const { network } = useNetworkContext();

  const handleLogin = async () => {
    setShowLoader(true);
    console.log(email);
    if (!email) return;
    try {
      console.log(network);
      await network?.loginWithOTP(email);
      await fetchUserInfo();
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    setShowLoader(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <CardContent>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Typography textAlign="center" variant="body1" color="text.secondary">
          We will send you an email to verify your account.
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <PrimaryButton
            size="large"
            variant="contained"
            onClick={async () => {
              if(!success) await handleLogin();
              else nextStage();
            }}
            disabled={showLoader || !email}
          >
            {success ? 'Continue' : 'Send OTP'}
          </PrimaryButton>
          {showLoader && (
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
        </Stack>
      </CardContent>
    </Box>
  );
};

export default Onboarding;
