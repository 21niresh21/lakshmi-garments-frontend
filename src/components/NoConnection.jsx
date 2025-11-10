import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

const NoConnection = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        borderRadius: 2,
        mx: "auto",
        mt: 30,
      }}
    >
      <ElectricalServicesIcon
        sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
      />
      <Typography variant="h6" gutterBottom>
        Connection Issue
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        It looks like your connection to the server is unstable or lost.
      </Typography>

      {
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Try Again
        </Button>
      }
    </Box>
  );
};

export default NoConnection;
