import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { TabPanel } from '../../pages/transfer-asset/transfer-asset';
import TransactionHistory from '../transaction-history';
import AssetDisplay from '../asset-display';

const AccountActivity = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (value: number) => {
    setSelectedTab(value);
  };

  return (
    <Box>
      {/* <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={(e) => handleChangeTab(selectedTab == 1 ? 0 : 1)}
        sx={{
          borderBottom: '1px solid rgb(0, 0, 0, 0.2)',
        }}
      >
        <Tab label="Assets" value="assets" />
        <Tab label="Activity" value="activity" />
      </Tabs> */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} variant='fullWidth' onChange={(e) => handleChangeTab(selectedTab == 1 ? 0 : 1)}>
          <Tab label="History" />
          <Tab label="Assets" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={1}>
        <AssetDisplay />
      </TabPanel>
      <TabPanel value={selectedTab} index={0}>
        <TransactionHistory />
      </TabPanel>
    </Box>
  );
};

export default AccountActivity;
