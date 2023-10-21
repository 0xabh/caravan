import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import logo from '../../../../assets/img/caravanLogo.png';
import {
  getActiveNetwork,
  getSupportedNetworks,
} from '../../../Background/redux-slices/selectors/networkSelectors';
import { useBackgroundDispatch, useBackgroundSelector } from '../../hooks';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { setActiveNetwork } from '../../../Background/redux-slices/network';
import { getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { getAccountData } from '../../../Background/redux-slices/account';
import { reinitializeKeyringThunk } from '../../../Background/redux-slices/keyrings';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useNetworkContext } from '../../../../context/NetworkContext';
import { Network } from '../../../Network';
import { useUserContext } from '../../../../context/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useBackgroundDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { selectedNetwork, updateMagicNetwork, network, magicNetwork } =
    useNetworkContext();
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const supportedNetworks = useBackgroundSelector(getSupportedNetworks);
  const activeAccount = useBackgroundSelector(getActiveAccount);
  console.log('current', selectedNetwork);
  const { user, setUser } = useUserContext();

  const handleChange = async (event: any) => {
    // console.log(event.target.value)
    const newNetwork = supportedNetworks.find(
      (network: any) => network.chainID == event.target.value
    );
    if (newNetwork === activeNetwork) return;
    let _network = null
    if (switchNetwork) {
      switchNetwork(parseInt(newNetwork!.chainID));
    }
    switch (newNetwork!.name) {
      case 'Polygon':
        updateMagicNetwork(Network['Polygon']);
        _network = Network['Polygon']
        localStorage.setItem('network', 'Polygon');
        break;
      case 'Optimism':
        updateMagicNetwork(Network['Optimism']);
        _network = Network['Optimism']
        localStorage.setItem('network', 'Optimism');
        break;
      case 'Mantle Testnet':
        updateMagicNetwork(Network['MantleTestnet']);
        _network = Network['MantleTestnet']
        localStorage.setItem('network', 'MantleTestnet');
        break;
      case 'Scroll':
        updateMagicNetwork(Network['Scroll']);
        _network = Network['Scroll']
        localStorage.setItem('network', 'Scroll');
        break;
      case 'Sepolia':
        updateMagicNetwork(Network['Sepolia']);
        _network = Network['Sepolia']
        localStorage.setItem('network', 'Sepolia');
        break;
      case 'Mumbai':
        updateMagicNetwork(Network['Mumbai']);
        _network = Network['Mumbai']
        localStorage.setItem('network', 'Mumbai');
        break;
    }
    await dispatch(setActiveNetwork(newNetwork));
    await dispatch(
      reinitializeKeyringThunk({
        network: newNetwork!,
        email: (await magicNetwork?.getInfo())?.email!,
        magicNetwork: _network!
      })
    );
    if (activeAccount) await dispatch(getAccountData(activeAccount));
  };

  useEffect(() => {
    // Define the function to fetch the balance
    const fetchBalance = async () => {
      if (!user) return;

      let newUser;
      try {
        // Check if network exists and then fetch balance
        if (network) {
          const balance = await network.fetchBalance(user.publicAddress!);
          // Create a new user object with the updated balance
          newUser = { ...user, balance };
        }
        console.log('newUser', newUser);
        // Check if the user object has changed and then update it
        if (JSON.stringify(user) !== JSON.stringify(newUser)) {
          setUser(newUser);
        }
      } catch (error) {
        console.log('Error fetching balance: ', error);
      }
    };

    fetchBalance();
  }, [user, network, setUser]);

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
        <img height={60} width={60} src={logo} className="App-logo" alt="logo" />
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
            {supportedNetworks.map((network: any) => (
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
