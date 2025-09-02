import React, { useEffect, useState } from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Box, Typography, Stack } from "@mui/material";
import { getWeeklyTransportCost } from "../../../api/analyticsApi";

function WeeklyTransportCostSparkline() {
  const [data, setData] = useState([]);
  const [percent, setPercent] = useState("-");
  const [trendColor, setTrendColor] = useState("grey.400");

  useEffect(() => {
    getWeeklyTransportCost().then((res) => {
      const values = res.map((w) => w.total_cost);
      setData(values);

      if (values.length === 0) {
        setPercent("No data");
        setTrendColor("grey.400");
      } else if (values.length === 1) {
        setPercent("-");
        setTrendColor("grey.400");
      } else {
        const prev = values[values.length - 2];
        const curr = values[values.length - 1];
        if (prev === 0) {
          setPercent("-");
          setTrendColor("grey.400");
        } else {
          const change = ((curr - prev) / prev) * 100;
          const rounded = Math.abs(change).toFixed(1);
          if (change > 0) {
            // Cost increased → Red
            setPercent(`+${rounded}%`);
            setTrendColor("error.main");
          } else if (change < 0) {
            // Cost decreased → Green
            setPercent(`-${rounded}%`);
            setTrendColor("success.main");
          } else {
            setPercent("0%");
            setTrendColor("grey.400");
          }
        }
      }
    });
  }, []);

  console.log(data);
  

  return (
    <Box
      p={2}
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="subtitle1">Transport Cost</Typography>
          <Typography variant="h6">
            {data.length > 0 && data[data.length - 1] != null
              ? `₹${data[data.length - 1]}`
              : "-"}
          </Typography>
        </Stack>
        <Typography variant="h6" sx={{ mt: 0.5, color: trendColor }}>
          {data.length > 0 && percent !== "No data" && percent !== "-"
            ? `${percent}`
            : percent}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {percent === "No data"
            ? "No data"
            : percent === "-"
            ? "Not enough data"
            : changeLabel(percent)}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 60, ml: -1 }}>
        <SparkLineChart
          data={data}
          height={30}
          width={60}
          showHighlight
          curve="monotone"
          showTooltip
          color={trendColor}
        />
      </Box>
    </Box>
  );
}

// Helper for description text
function changeLabel(percent) {
  if (percent.startsWith("+")) return "Increase in cost from last week";
  if (percent.startsWith("-")) return "Decrease in cost from last week";
  return "No change from last week";
}

export default WeeklyTransportCostSparkline;
