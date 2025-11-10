import React from "react";
import { Box, Typography, Divider } from "@mui/material";

function PayDay() {
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
          Pay Day
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

      </Box>

    </Box>
  );
}

export default PayDay;
