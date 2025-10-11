import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BatchContent from "../features/batch/BatchContent";
import { useParams } from "react-router";

export default function BatchDetail() {

    const batchId = useParams().id;

  useEffect(() => {
    // getBatch(batchId).then((res) => {
    //   setBatch(res.data);
    // });
  }, [batchId]);

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
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h5" gutterBottom>
          Batch Detail
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
      <BatchContent />
    </Box>
  );
}
