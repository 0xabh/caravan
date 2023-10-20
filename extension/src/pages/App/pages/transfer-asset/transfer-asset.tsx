import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { ReactEventHandler, useCallback, useEffect } from 'react';
import Header from '../../components/header';
import { ethers } from 'ethers';
import { useBackgroundDispatch, useBackgroundSelector } from '../../hooks';
import { getActiveAccount } from '../../../Background/redux-slices/selectors/accountSelectors';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../Account/components/PrimaryButton';
import getEthereumGlobal, {
  getEthereumGlobalProvider,
} from '../../../../helpers/getEthereumGlobal';
import { useSwitchNetwork } from 'wagmi';
import {
  getActiveNetwork,
  getSupportedNetworks,
} from '../../../Background/redux-slices/selectors/networkSelectors';
import { setActiveNetwork } from '../../../Background/redux-slices/network';
import { reinitializeKeyringThunk } from '../../../Background/redux-slices/keyrings';
import { getAccountData } from '../../../Background/redux-slices/account';
import { Network } from '../../../Network';
import { useNetworkContext } from '../../../../context/NetworkContext';
import NativeTransfer from '../../components/transfer-asset-button/NativeTransfer';
//@ts-ignore
const spookPoolABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rootBundleId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyDeleteRootBundle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'originToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'destinationChainId',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'EnabledDepositRoute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountToReturn',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'refundAmounts',
        type: 'uint256[]',
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'rootBundleId',
        type: 'uint32',
      },
      { indexed: true, internalType: 'uint32', name: 'leafId', type: 'uint32' },
      {
        indexed: false,
        internalType: 'address',
        name: 'l2TokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'refundAddresses',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'ExecutedRelayerRefundRoot',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalFilledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fillAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'repaymentChainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'originChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'destinationChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int64',
        name: 'relayerFeePct',
        type: 'int64',
      },
      {
        indexed: false,
        internalType: 'int64',
        name: 'realizedLpFeePct',
        type: 'int64',
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'depositId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'destinationToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      { indexed: false, internalType: 'bytes', name: 'message', type: 'bytes' },
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'bytes', name: 'message', type: 'bytes' },
          { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
          { internalType: 'bool', name: 'isSlowRelay', type: 'bool' },
          {
            internalType: 'int256',
            name: 'payoutAdjustmentPct',
            type: 'int256',
          },
        ],
        indexed: false,
        internalType: 'struct SpokePool.RelayExecutionInfo',
        name: 'updatableRelayData',
        type: 'tuple',
      },
    ],
    name: 'FilledRelay',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'originChainId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'destinationChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int64',
        name: 'relayerFeePct',
        type: 'int64',
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'depositId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'quoteTimestamp',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'originToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      { indexed: false, internalType: 'bytes', name: 'message', type: 'bytes' },
    ],
    name: 'FundsDeposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' },
    ],
    name: 'PausedDeposits',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' },
    ],
    name: 'PausedFills',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PolygonTokensBridged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'rootMessageSender',
        type: 'address',
      },
    ],
    name: 'ReceivedMessageFromL1',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'relayer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'refundToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'originChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'destinationChainId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int64',
        name: 'realizedLpFeePct',
        type: 'int64',
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'depositId',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fillBlock',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'previousIdenticalRequests',
        type: 'uint256',
      },
    ],
    name: 'RefundRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint32',
        name: 'rootBundleId',
        type: 'uint32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'relayerRefundRoot',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'slowRelayRoot',
        type: 'bytes32',
      },
    ],
    name: 'RelayedRootBundle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'int64',
        name: 'newRelayerFeePct',
        type: 'int64',
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'depositId',
        type: 'uint32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'updatedRecipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'updatedMessage',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'depositorSignature',
        type: 'bytes',
      },
    ],
    name: 'RequestedSpeedUpDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newBuffer',
        type: 'uint32',
      },
    ],
    name: 'SetDepositQuoteTimeBuffer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newFxChild',
        type: 'address',
      },
    ],
    name: 'SetFxChild',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newHubPool',
        type: 'address',
      },
    ],
    name: 'SetHubPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'polygonTokenBridger',
        type: 'address',
      },
    ],
    name: 'SetPolygonTokenBridger',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'SetXDomainAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountToReturn',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'uint32', name: 'leafId', type: 'uint32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'l2TokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'TokensBridged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_TRANSFER_SIZE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SLOW_FILL_MAX_TOKENS_TO_SEND',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UPDATE_DEPOSIT_DETAILS_HASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_initialDepositId', type: 'uint32' },
      { internalType: 'address', name: '_crossDomainAdmin', type: 'address' },
      { internalType: 'address', name: '_hubPool', type: 'address' },
      {
        internalType: 'address',
        name: '_wrappedNativeTokenAddress',
        type: 'address',
      },
    ],
    name: '__SpokePool_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'chainId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'crossDomainAdmin',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'quoteTimestamp', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'depositCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'depositNow',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositQuoteTimeBuffer',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'rootBundleId', type: 'uint256' },
    ],
    name: 'emergencyDeleteRootBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'enabledDepositRoutes',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      {
        components: [
          { internalType: 'uint256', name: 'amountToReturn', type: 'uint256' },
          { internalType: 'uint256', name: 'chainId', type: 'uint256' },
          {
            internalType: 'uint256[]',
            name: 'refundAmounts',
            type: 'uint256[]',
          },
          { internalType: 'uint32', name: 'leafId', type: 'uint32' },
          { internalType: 'address', name: 'l2TokenAddress', type: 'address' },
          {
            internalType: 'address[]',
            name: 'refundAddresses',
            type: 'address[]',
          },
        ],
        internalType: 'struct SpokePoolInterface.RelayerRefundLeaf',
        name: 'relayerRefundLeaf',
        type: 'tuple',
      },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'executeRelayerRefundLeaf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'uint32', name: 'rootBundleId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'int256', name: 'payoutAdjustment', type: 'int256' },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'executeSlowRelayLeaf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'fillCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'maxTokensToSend', type: 'uint256' },
      { internalType: 'uint256', name: 'repaymentChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'fillRelay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'updatedRecipient', type: 'address' },
      { internalType: 'address', name: 'destinationToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'maxTokensToSend', type: 'uint256' },
      { internalType: 'uint256', name: 'repaymentChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'int64', name: 'relayerFeePct', type: 'int64' },
      { internalType: 'int64', name: 'updatedRelayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'bytes', name: 'message', type: 'bytes' },
      { internalType: 'bytes', name: 'updatedMessage', type: 'bytes' },
      { internalType: 'bytes', name: 'depositorSignature', type: 'bytes' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'fillRelayWithUpdatedDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fxChild',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hubPool',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_initialDepositId', type: 'uint32' },
      {
        internalType: 'contract PolygonTokenBridger',
        name: '_polygonTokenBridger',
        type: 'address',
      },
      { internalType: 'address', name: '_crossDomainAdmin', type: 'address' },
      { internalType: 'address', name: '_hubPool', type: 'address' },
      { internalType: 'address', name: '_wmaticAddress', type: 'address' },
      { internalType: 'address', name: '_fxChild', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberOfDeposits',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'pause', type: 'bool' }],
    name: 'pauseDeposits',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'pause', type: 'bool' }],
    name: 'pauseFills',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausedDeposits',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausedFills',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'polygonTokenBridger',
    outputs: [
      {
        internalType: 'contract PolygonTokenBridger',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: 'rootMessageSender', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'processMessageFromRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'refundsRequested',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'relayFills',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'relayerRefundRoot', type: 'bytes32' },
      { internalType: 'bytes32', name: 'slowRelayRoot', type: 'bytes32' },
    ],
    name: 'relayRootBundle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'refundToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'originChainId', type: 'uint256' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'int64', name: 'realizedLpFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'uint256', name: 'fillBlock', type: 'uint256' },
      { internalType: 'uint256', name: 'maxCount', type: 'uint256' },
    ],
    name: 'requestRefund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'rootBundles',
    outputs: [
      { internalType: 'bytes32', name: 'slowRelayRoot', type: 'bytes32' },
      { internalType: 'bytes32', name: 'relayerRefundRoot', type: 'bytes32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newCrossDomainAdmin', type: 'address' },
    ],
    name: 'setCrossDomainAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newDepositQuoteTimeBuffer',
        type: 'uint32',
      },
    ],
    name: 'setDepositQuoteTimeBuffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'originToken', type: 'address' },
      { internalType: 'uint256', name: 'destinationChainId', type: 'uint256' },
      { internalType: 'bool', name: 'enabled', type: 'bool' },
    ],
    name: 'setEnableRoute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newFxChild', type: 'address' }],
    name: 'setFxChild',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newHubPool', type: 'address' }],
    name: 'setHubPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'newPolygonTokenBridger',
        type: 'address',
      },
    ],
    name: 'setPolygonTokenBridger',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'int64', name: 'updatedRelayerFeePct', type: 'int64' },
      { internalType: 'uint32', name: 'depositId', type: 'uint32' },
      { internalType: 'address', name: 'updatedRecipient', type: 'address' },
      { internalType: 'bytes', name: 'updatedMessage', type: 'bytes' },
      { internalType: 'bytes', name: 'depositorSignature', type: 'bytes' },
    ],
    name: 'speedUpDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newImplementation', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newImplementation', type: 'address' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wrap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wrappedNativeToken',
    outputs: [
      { internalType: 'contract WETH9Interface', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
const polygonAddresses: Record<
  string,
  {
    symbol: string;
    decimals: number;
    name: string;
  }
> = {
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': {
    symbol: 'DAI',
    decimals: 18,
    name: 'Dai Stablecoin',
  },
  '0x3066818837c5e6eD6601bd5a91B0762877A6B731': {
    symbol: 'UMA',
    decimals: 18,
    name: 'UMA Coin',
  },
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': {
    symbol: 'WETH',
    decimals: 18,
    name: 'Wrapped Ether',
  },
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
  },
  '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6': {
    symbol: 'WBTC',
    decimals: 8,
    name: 'Wrapped BTC',
  },
  '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3': {
    symbol: 'BAL',
    decimals: 18,
    name: 'Balancer',
  },
  '0xF328b73B6c685831F238c30a23Fc19140CB4D8FC': {
    symbol: 'ACX',
    decimals: 18,
    name: 'ACX',
  },
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': {
    symbol: 'USDT',
    decimals: 6,
    name: 'Tether USD',
  },
  '0x25788a1a171ec66Da6502f9975a15B609fF54CF6': {
    symbol: 'POOL',
    decimals: 18,
    name: 'PoolTogether',
  },
};

const polygonSymbol: Record<
  string,
  {
    address: string;
    decimals: number;
    name: string;
  }
> = {
  DAI: {
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    name: 'Dai Stablecoin',
  },
  UMA: {
    address: '0x3066818837c5e6eD6601bd5a91B0762877A6B731',
    decimals: 18,
    name: 'UMA Coin',
  },
  WETH: {
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    name: 'Wrapped Ether',
  },
  USDC: {
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    name: 'USD Coin',
  },
  WBTC: {
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    decimals: 8,
    name: 'Wrapped BTC',
  },
  BAL: {
    address: '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
    decimals: 18,
    name: 'Balancer',
  },
  ACX: {
    address: '0xF328b73B6c685831F238c30a23Fc19140CB4D8FC',
    decimals: 18,
    name: 'ACX',
  },
  USDT: {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    name: 'Tether USD',
  },
  POOL: {
    address: '0x25788a1a171ec66Da6502f9975a15B609fF54CF6',
    decimals: 18,
    name: 'PoolTogether',
  },
};

const optimismAddresses: Record<
  string,
  {
    symbol: string;
    decimals: number;
    name: string;
  }
> = {
  '0x4200000000000000000000000000000000000006': {
    symbol: 'WETH',
    decimals: 18,
    name: 'Wrapped Ether',
  },
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607': {
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
  },
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095': {
    symbol: 'WBTC',
    decimals: 8,
    name: 'Wrapped BTC',
  },
  '0xE7798f023fC62146e8Aa1b36Da45fb70855a77Ea': {
    symbol: 'UMA',
    decimals: 18,
    name: 'UMA',
  },
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1': {
    symbol: 'DAI',
    decimals: 18,
    name: 'Dai Stablecoin',
  },
  '0xFE8B128bA8C78aabC59d4c64cEE7fF28e9379921': {
    symbol: 'BAL',
    decimals: 18,
    name: 'Balancer',
  },
  '0xFf733b2A3557a7ed6697007ab5D11B79FdD1b76B': {
    symbol: 'ACX',
    decimals: 18,
    name: 'ACX',
  },
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58': {
    symbol: 'USDT',
    decimals: 6,
    name: 'Tether USD',
  },
  '0x395Ae52bB17aef68C2888d941736A71dC6d4e125': {
    symbol: 'POOL',
    decimals: 18,
    name: 'PoolTogether',
  },
};

const optimismSymbol: Record<
  string,
  {
    address: string;
    decimals: number;
    name: string;
  }
> = {
  WETH: {
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    name: 'Wrapped Ether',
  },
  USDC: {
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    decimals: 6,
    name: 'USD Coin',
  },
  WBTC: {
    address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    decimals: 8,
    name: 'Wrapped BTC',
  },
  UMA: {
    address: '0xE7798f023fC62146e8Aa1b36Da45fb70855a77Ea',
    decimals: 18,
    name: 'UMA',
  },
  DAI: {
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    decimals: 18,
    name: 'Dai Stablecoin',
  },
  BAL: {
    address: '0xFE8B128bA8C78aabC59d4c64cEE7fF28e9379921',
    decimals: 18,
    name: 'Balancer',
  },
  ACX: {
    address: '0xFf733b2A3557a7ed6697007ab5D11B79FdD1b76B',
    decimals: 18,
    name: 'ACX',
  },
  USDT: {
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    name: 'Tether USD',
  },
  POOL: {
    address: '0x395Ae52bB17aef68C2888d941736A71dC6d4e125',
    decimals: 18,
    name: 'PoolTogether',
  },
};

const TransferAsset = () => {
  const navigate = useNavigate();
  const [toAddress, setToAddress] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const { selectedNetwork, updateMagicNetwork, network, magicNetwork } =
    useNetworkContext();
  const [loader, setLoader] = React.useState<boolean>(false);
  const [alltTokens, setAllTokens] = React.useState<string[]>([
    'WETH',
    'USDC',
    'USDT',
    'DAI',
    'WBTC',
    'WETH',
  ]);
  const [tokenAddresses, setTokenAddresses] = React.useState<string[]>(['']);
  const [token, setToken] = React.useState<string>('WETH');
  const [balance, setBalance] = React.useState<string>('0');
  const {
    isLoading,
    pendingChainId,
    switchNetwork,
    chains: allchains,
  } = useSwitchNetwork();
  const [chains, setChains] = React.useState<{
    source: String;
    destination: String;
  }>({
    source: 'Polygon',
    destination: 'Polygon',
  });
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const supportedNetworks = useBackgroundSelector(getSupportedNetworks);
  const dispatch = useBackgroundDispatch();
  const handleChange = async (event: any) => {
    // console.log(event.target.value)
    const newNetwork = supportedNetworks.find(
      (network) =>
        network.chainID == (event.target.value == 'Polygon' ? '137' : '10')
    );
    if (newNetwork === activeNetwork) return;
    let _network = null;
    if (switchNetwork) {
      switchNetwork(parseInt(newNetwork!.chainID));
    }
    switch (newNetwork!.name) {
      case 'Polygon':
        updateMagicNetwork(Network['Polygon']);
        _network = Network['Polygon'];
        localStorage.setItem('network', 'Polygon');
        break;
      case 'Optimism':
        updateMagicNetwork(Network['Optimism']);
        _network = Network['Optimism'];
        localStorage.setItem('network', 'Optimism');
        break;
      case 'Mantle Testnet':
        updateMagicNetwork(Network['MantleTestnet']);
        _network = Network['MantleTestnet'];
        localStorage.setItem('network', 'MantleTestnet');
        break;
      case 'Scroll':
        updateMagicNetwork(Network['Scroll']);
        _network = Network['Scroll'];
        localStorage.setItem('network', 'Scroll');
        break;
      case 'Sepolia':
        updateMagicNetwork(Network['Sepolia']);
        _network = Network['Sepolia'];
        localStorage.setItem('network', 'Sepolia');
        break;
      case 'Mumbai':
        updateMagicNetwork(Network['Mumbai']);
        _network = Network['Mumbai'];
        localStorage.setItem('network', 'Mumbai');
        break;
    }
    await dispatch(setActiveNetwork(newNetwork));
    await dispatch(
      reinitializeKeyringThunk({
        network: newNetwork!,
        email: (await magicNetwork?.getInfo())?.email!,
        magicNetwork: _network!,
      })
    );
    if (activeAccount) await dispatch(getAccountData(activeAccount));
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

  const checkNativeBalance = async () => {
    const ethereum = getEthereumGlobal();
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [activeAccount, 'latest'],
    });
    return balance;
  };

  const sendApproval = async (spookPoolAddress: string) => {
    const method = '0x095ea7b3'; // approve(address,uint256)
    // Convert the amount from ethers to its smallest unit
    // Convert the amount from ethers to its smallest unit
    let amountInSmallestUnit = ethers.utils.parseUnits(
      value.toString(),
      chains.source === 'Polygon'
        ? polygonSymbol[token].decimals
        : optimismSymbol[token].decimals
    );
    amountInSmallestUnit = amountInSmallestUnit.mul(2);

    // Convert to hexadecimal and pad it
    const amountHex = amountInSmallestUnit
      .toHexString()
      .substring(2)
      .padStart(64, '0');
    // Prepare the data payload
    const data = `${method}${spookPoolAddress
      .substring(2)
      .padStart(64, '0')}${amountHex}`;

    const ethereum = getEthereumGlobal();
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: activeAccount,
          to:
            chains.source === 'Polygon'
              ? polygonSymbol[token].address
              : optimismSymbol[token].address,
          data,
        },
      ],
    });
    console.log(txHash);
    return txHash;
  };

  const checkTokenBalance = async () => {
    const method = '0x70a08231'; // balanceOf(address)
    const data = `${method}${(activeAccount as string)
      .substring(2)
      .padStart(64, '0')}`;
    const ethereum = getEthereumGlobal();
    console.log(token, chains.source, optimismSymbol[token].address);
    const balance = await ethereum.request({
      method: 'eth_call',
      params: [
        {
          to:
            chains.source === 'Polygon'
              ? polygonSymbol[token].address
              : optimismSymbol[token].address,
          data,
        },
        'latest',
      ],
    });
    console.log(balance, 'balance');
    const balanceInReadable = ethers.utils.formatUnits(
      balance,
      chains.source === 'Polygon'
        ? polygonSymbol[token].decimals
        : optimismSymbol[token].decimals
    );
    // console.log(balanceInReadable);
    setBalance(balanceInReadable);
  };

  const getCurrentTime = async (spokePoolAddress: string) => {
    // const method = '0x70a08231'; // balanceOf(address)
    const functionSignature = 'getCurrentTime()';
    const methodId = ethers.utils
      .keccak256(ethers.utils.toUtf8Bytes(functionSignature))
      .substring(0, 10);
    const data = `${methodId}${(activeAccount as string)
      .substring(2)
      .padStart(64, '0')}`;
    const ethereum = getEthereumGlobal();
    const time = await ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: spokePoolAddress,
          data,
        },
        'latest',
      ],
    });
    return time;
  };

  useEffect(() => {
    checkTokenBalance();
  }, [, token, chains.source]);

  const generateCrossChainParams = async () => {
    const tokenAddr =
      chains.source === 'Polygon'
        ? polygonSymbol[token].address
        : optimismSymbol[token].address;
    const sourceChainId = chains.source === 'Polygon' ? 137 : 10;
    const destinationChainId = chains.destination === 'Polygon' ? 137 : 10;
    const amountInUnits = ethers.utils.parseUnits(
      value,
      chains.source === 'Polygon'
        ? polygonSymbol[token].decimals
        : optimismSymbol[token].decimals
    );
    const url = `https://across.to/api/suggested-fees?token=${tokenAddr}&destinationChainId=${destinationChainId}&originChainId=${sourceChainId}&amount=${amountInUnits}&skipAmountLimit=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const params = await response.json();
    console.log(params);
    return params;
  };

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
      chains.source === 'Polygon'
        ? polygonSymbol[token].decimals
        : optimismSymbol[token].decimals
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
            chains.source === 'Polygon'
              ? polygonSymbol[token].address
              : optimismSymbol[token].address,
          data,
        },
      ],
    });
    console.log(txHash);
    navigate('/');
    setLoader(false);
  };

  const sendDeposit = async (
    recipient: any,
    originToken: any,
    amount: any,
    destinationChainId: any,
    relayerFeePct: any,
    quoteTimestamp: any,
    activeAccount: any,
    spokePoolAddress: any
  ) => {
    const provider = getEthereumGlobalProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      spokePoolAddress,
      spookPoolABI,
      signer
    );
    const deposit = await contract.deposit(
      recipient,
      originToken,
      amount.toString(),
      destinationChainId.toString(),
      ethers.BigNumber.from(relayerFeePct).mul(2),
      quoteTimestamp.toString(),
      '0x',
      ethers.constants.MaxInt256
    );
    await deposit.wait();
    console.log(deposit.transactionHash);
  };
  const crossChainTransfer = async () => {
    const params = await generateCrossChainParams();
    console.log(params);
    // await sendApproval(params.spokePoolAddress);
    // const contract = new ethers.Contract(params.spokePoolAddress, spookPoolABI);
    const currentSpokePoolTime = await getCurrentTime(params.spokePoolAddress);

    console.log('approved', currentSpokePoolTime);
    const amountInSmallestUnit = ethers.utils.parseUnits(
      value.toString(),
      chains.source === 'Polygon'
        ? polygonSymbol[token].decimals
        : optimismSymbol[token].decimals
    );
    console.log(
      toAddress,
      chains.source === 'Polygon'
        ? polygonSymbol[token].address
        : optimismSymbol[token].address,
      amountInSmallestUnit,
      chains.destination === 'Polygon' ? 137 : 10,
      ethers.BigNumber.from(params.relayFeePct).mul(2),
      currentSpokePoolTime,
      activeAccount,
      params.spokePoolAddress
    );
    const sendDepositTxHash = await sendDeposit(
      toAddress,
      chains.source === 'Polygon'
        ? polygonSymbol[token].address
        : optimismSymbol[token].address,
      amountInSmallestUnit,
      chains.destination === 'Polygon' ? 137 : 10,
      ethers.BigNumber.from(params.relayFeePct).mul(2),
      params.timestamp,
      activeAccount,
      params.spokePoolAddress
    );
    console.log(sendDepositTxHash);
  };
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (value: number) => {
    setSelectedTab(value);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={(e) => handleChangeTab(selectedTab == 1 ? 0 : 1)}>
          <Tab label="Transfer" />
          <Tab label="Cross Chain Transfer" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={1}>
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
            <Typography variant="h6">Cross Chain Transfer</Typography>
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
              <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                <InputLabel htmlFor="password">Send to</InputLabel>
                <OutlinedInput
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  autoFocus
                  label="Send to"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                <InputLabel htmlFor="text">Source Chain</InputLabel>
                <Select
                  // defaultValue={chains.source}
                  // onChange={(e) => setToAddress(e.target.value)}
                  value={chains.source}
                  onChange={(e) => {
                    setChains({
                      source: e.target.value,
                      destination: chains.destination,
                    });
                    handleChange(e);
                  }}
                  autoFocus
                  // label="Send to"
                >
                  {/* <option value="Polygon">Polygon</option> */}
                  {/* <option value="Optimism">Optimism</option> */}
                  <MenuItem value="Polygon">Polygon</MenuItem>
                  <MenuItem value="Optimism">Optimism</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                <InputLabel htmlFor="text">Select Token</InputLabel>
                <Select
                  // defaultValue={chains.source}
                  // onChange={(e) => setToAddress(e.target.value)}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  autoFocus
                  // label="Send to"
                >
                  {/* <option value="Polygon">Polygon</option> */}
                  {/* <option value="Optimism">Optimism</option> */}
                  {/* <MenuItem value="Polygon">Polygon</MenuItem>
                <MenuItem value="Optimism">Optimism</MenuItem> */}
                  {chains.source === 'Polygon'
                    ? Object.keys(polygonAddresses).map((token) => (
                        <MenuItem value={polygonAddresses[token].symbol}>
                          {polygonAddresses[token].symbol}
                        </MenuItem>
                      ))
                    : Object.keys(optimismAddresses).map((token) => (
                        <MenuItem value={optimismAddresses[token].symbol}>
                          {optimismAddresses[token].symbol}
                        </MenuItem>
                      ))}
                </Select>

                <label htmlFor="">Available Balance: {balance}</label>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                <InputLabel htmlFor="text">Destination Chain</InputLabel>
                <Select
                  // defaultValue={chains.source}
                  // onChange={(e) => setToAddress(e.target.value)}
                  value={chains.destination}
                  onChange={(e) =>
                    setChains({
                      source: chains.source,
                      destination: e.target.value,
                    })
                  }
                  autoFocus
                  // label="Send to"
                >
                  {/* <option value="Polygon">Polygon</option> */}
                  {/* <option value="Optimism">Optimism</option> */}
                  <MenuItem value="Polygon">Polygon</MenuItem>
                  <MenuItem value="Optimism">Optimism</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                <InputLabel htmlFor="password">Value</InputLabel>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">{token}</InputAdornment>
                  }
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  label="Value"
                />
              </FormControl>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
              <PrimaryButton
                disabled={loader}
                // onClick={sendEth}
                onClick={() => {
                  chains.source == chains.destination
                    ? sendToken()
                    : crossChainTransfer();
                }}
                sx={{ mt: 4 }}
                size="large"
                variant="contained"
              >
                Send
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
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
    </Container>
      </TabPanel>
      <TabPanel value={selectedTab} index={0}>
        <NativeTransfer/>
      </TabPanel>
    </Container>
  );
};



function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default TransferAsset;
