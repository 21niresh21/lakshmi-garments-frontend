import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import BatchTimeline from "./BatchTimeline";
import AssignJobworkForm from "./AssignJobworkForm";
import { fetchEmployees } from "../../api/employeeApi";
import { fetchJobworkTypeForBatchId, fetchJobworkTypes } from "../../api/jobworkTypeApi";
import {
  getBatchCountById,
  getBatchTimeline,
  getPendingBatches,
} from "../../api/batchApi";
import { createJobwork, getNextJobworkNumber } from "../../api/jobworkApi";

function AssignJobwork() {
  const [employees, setEmployees] = useState([]);
  const [jobworkTypes, setJobworkTypes] = useState([]);
  const [pendingBatches, setPendingBatches] = useState([]);
  const [nextJobworkNumber, setNextJobworkNumber] = useState("");
  const [batchTimeline, setBatchTimeline] = useState([]);
  const [batchCount, setBatchCount] = useState(0);

  useEffect(() => {
    fetchEmployees().then((response) => {
      setEmployees(response.data);
    });

    getPendingBatches().then((response) => {
      console.log(response.data);
      setPendingBatches(response.data);
    });
    getNextJobworkNumber().then((response) => {
      console.log(response.data);
      setNextJobworkNumber(response.data);
    });
  }, []);

  const handleBatchTimelineChange = (batchId) => {
    getBatchTimeline(batchId).then((response) => {
      setBatchTimeline(response.data);
    });
    getBatchCountById(batchId).then((response) => {
      console.log(response.data);
      setBatchCount(response.data);
    });
    fetchJobworkTypeForBatchId(batchId).then((response) => {
      console.log(response.data);
      setJobworkTypes(response.data);
    });
  };

  const handleSubmit = (jobwork) => {
    console.log("jobwork", jobwork);

    createJobwork(jobwork).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <Grid container sx={{ height: "90%" }}>
      {/* Left Section */}
      <Grid item xs={8}>
        <Box
          sx={{
            height: "100%",
            overflow: "auto", // scroll inside left if needed
            p: 2,
            borderRight: batchTimeline.length > 0 ? "1px solid #e0e0e0" : "none",
          }}
        >
          <AssignJobworkForm
            employees={employees}
            jobworkTypes={jobworkTypes}
            pendingBatches={pendingBatches}
            nextJobworkNumber={nextJobworkNumber}
            handleBatchTimelineChange={handleBatchTimelineChange}
            onSubmit={handleSubmit}
            batchCount={batchCount}
          />
        </Box>
      </Grid>

      {/* Right Section */}
      {batchTimeline.length > 0 && <Grid item xs={4}>
        <Grid container direction="column" sx={{ height: "100%" }}>
          {/* Top Right Timeline */}

          <Grid item xs={12} sx={{ height: "100%" }}>
            <Typography
              sx={{
                px: 2,
                pt: 1,
                userSelect: "none",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                flexShrink: 0,
              }}
            >
              Batch Timeline
            </Typography>
            <Box
              sx={{
                height: "100%",
                p: 2,
                overflowY: "auto",
              }}
            >
              <BatchTimeline steps={batchTimeline} />
            </Box>
          </Grid>
        </Grid>
      </Grid>}
    </Grid>
  );
}

export default AssignJobwork;
