import React from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import InvoiceAnalytics from "../features/analytics/invoice/InvoiceAnalytics";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Analytics() {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Tabs value={tab} onChange={handleTabChange} aria-label="analytics tabs">
        <Tab label="Invoice" />
        <Tab label="Trends" />
        <Tab label="Reports" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <InvoiceAnalytics/>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Trends content goes here.
      </TabPanel>
      <TabPanel value={tab} index={2}>
        Reports content goes here.
      </TabPanel>
    </Paper>
  );
}

export default Analytics;