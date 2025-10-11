import React, { useState } from "react";
import { Grid, Box, Typography, Divider, Tabs, Tab } from "@mui/material";
import AssignJobwork from "../features/jobwork/AssignJobwork";
import ReturnJobwork from "../features/jobwork/ReturnJobwork";

function Jobwork() {
  const [tab, setTab] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)", // full viewport height
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header and Tabs Section (Fixed) */}
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h5" gutterBottom>
          Jobwork Management
        </Typography>

        <Divider
          sx={{
            bgcolor: "#fff",
            borderColor: "#fff",
            ml: -3,
            mr: -3,
            height: 2,
            mb: 1,
          }}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="Assign Jobwork" />
            <Tab label="Return Jobwork" />
          </Tabs>
        </Box>
      </Box>

      {/* Scrollable Content Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mt: 2,
          p: 1,
        }}
      >
        {tab === 0 && <AssignJobwork />}
          {tab === 1 && <ReturnJobwork />}
      </Box>
    </Box>
  );
}

export default Jobwork;
