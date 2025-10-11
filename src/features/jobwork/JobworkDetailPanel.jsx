import React from "react";
import { Box, Typography, Grid, Chip, Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NumbersIcon from "@mui/icons-material/Numbers";
import { formatDateTimeToVerbose } from "../../utils/dateUtils";

// icons imports same as your original code

function JobworkDetailPanel({ jobworkData }) {
  // build detailItems dynamically using jobworkData, assuming jobworkData passed in props
  const detailItems = [
    {
      icon: <WorkIcon color="primary" sx={{ fontSize: 20 }} />,
      label: "Jobwork Type",
      value: jobworkData.jobworkType,
    },
    {
      icon: <Inventory2Icon color="primary" sx={{ fontSize: 20 }} />,
      label: "Batch Serial",
      value: jobworkData.batchSerialCode,
    },
    {
      icon: <PersonIcon color="primary" sx={{ fontSize: 20 }} />,
      label: "Assigned To",
      value: jobworkData.assignedTo,
    },
    {
      icon: <CalendarTodayIcon color="primary" sx={{ fontSize: 20 }} />,
      label: "Started At",
      value: formatDateTimeToVerbose(jobworkData.startedAt),
    },
    {
      icon: <NumbersIcon color="primary" sx={{ fontSize: 20 }} />,
      label: "Quantity",
      value: jobworkData.items.length === 0 ? jobworkData.quantity[0] : "",
    },
    // We'll handle items + quantities separately below
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container direction="column" spacing={2}>
        {detailItems.map((item, index) => {
          // Skip rendering Quantity if items.length > 0
          if (item.label === "Quantity" && jobworkData.items.length > 0) {
            return null;
          }

          return (
            <Grid item key={index}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    {item.icon}
                    <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                      {item.label}:
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

        {/* Render items + quantities only if items exist and length > 0 */}
        {jobworkData.items && jobworkData.items.length > 0 && (
          <Grid item>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Inventory2Icon color="primary" sx={{ fontSize: 20 }} />
                  <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                    Items:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1}>
                  {jobworkData.items.map((item, i) => (
                    <Chip
                      key={i}
                      label={`${item} : ${jobworkData.quantity[i]}`}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default JobworkDetailPanel;
