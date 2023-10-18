import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React, {useCallback} from 'react';
import logo from '../../../../assets/img/logo.svg';
import {
  getActiveNetwork,
  getSupportedNetworks,
} from '../../../Background/redux-slices/selectors/networkSelectors';
import {useBackgroundDispatch, useBackgroundSelector} from '../../hooks';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import {setActiveNetwork} from "../../../Background/redux-slices/network";
import {getActiveAccount} from "../../../Background/redux-slices/selectors/accountSelectors";
import {getAccountData} from "../../../Background/redux-slices/account";
import {reinitializeKeyringThunk} from "../../../Background/redux-slices/keyrings";
import {useNetwork, useSwitchNetwork} from "wagmi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useBackgroundDispatch();
  const {chain} = useNetwork()
  const {chains, error, isLoading, pendingChainId, switchNetwork} = useSwitchNetwork()
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const supportedNetworks = useBackgroundSelector(getSupportedNetworks);
  const activeAccount = useBackgroundSelector(getActiveAccount)
  // console.log("current", chain)

  const handleChange = async (event: any) => {
    // console.log(event.target.value)
    const newNetwork = supportedNetworks.find(
        (network) => network.chainID == event.target.value
    );
    // console.log(newNetwork)
    await dispatch(setActiveNetwork(newNetwork));
    await dispatch(reinitializeKeyringThunk(newNetwork!))
    if (switchNetwork) {
      switchNetwork(parseInt(newNetwork!.chainID))
    }
    if(activeAccount) await dispatch(getAccountData(activeAccount));
  }

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mr: 4,
        ml: 4,
        mt: 2,
        mb: 2,
        height: 60,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <img height={30} src={logo} className="App-logo" alt="logo" />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel id="chain-selector">Chain</InputLabel>
          <Select
            labelId="chain-selector"
            id="chain-selector"
            value={activeNetwork.chainID}
            label="Chain"
            onChange={handleChange}
          >
            {supportedNetworks.map((network) => (
              <MenuItem key={network.chainID} value={network.chainID}>
                {network.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SettingsIcon fontSize="large" />
      </Stack>
    </Box>
  );
};

export default Header;
