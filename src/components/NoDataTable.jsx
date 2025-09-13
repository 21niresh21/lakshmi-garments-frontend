import { Box, TableCell, TableRow, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import React from "react";

function NoDataTable() {
  return (
    <TableRow>
      <TableCell colSpan={8} align="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 6,
          }}
        >
          <InboxIcon sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            No Data Available
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default NoDataTable;
