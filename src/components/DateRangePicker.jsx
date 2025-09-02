import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const DateRangeSelector = ({ initialStart, initialEnd, onApply }) => {
  const today = dayjs();
  const mondayThisWeek = today.startOf("isoWeek");

  const [startDate, setStartDate] = useState(initialStart || mondayThisWeek);
  const [endDate, setEndDate] = useState(initialEnd || today);
  const [selectedRange, setSelectedRange] = useState("This week");

  const options = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "Current month",
    "Last month",
    "Current year",
    "Custom",
  ];

  const handleDateChange = (newDate, type) => {
    if (!newDate) return;

    if (type === "start") {
      // If the start date is after the end date, clear the end date
      if (newDate.isAfter(endDate)) {
        setEndDate(null);
      }
      setStartDate(newDate);
    } else {
      // If the end date is before the start date, reset the start date
      if (newDate.isBefore(startDate)) {
        setStartDate(null);
      }
      setEndDate(newDate);
    }

    setSelectedRange("Custom");
  };

  const handleRangeChange = (event, value) => {
    if (!value) return;
    setSelectedRange(value);

    switch (value) {
      case "This week":
        setStartDate(mondayThisWeek);
        setEndDate(today);
        break;

      case "Today":
        setStartDate(today);
        setEndDate(today);
        break;

      case "Yesterday":
        const yesterday = today.subtract(1, "day");
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;

      case "Last week":
        const lastWeekStart = mondayThisWeek.subtract(1, "week");
        const lastWeekEnd = lastWeekStart.add(6, "day");
        setStartDate(lastWeekStart);
        setEndDate(lastWeekEnd);
        break;

      case "Current month":
        setStartDate(today.startOf("month"));
        setEndDate(today);
        break;

      case "Last month":
        const lastMonth = today.subtract(1, "month");
        setStartDate(lastMonth.startOf("month"));
        setEndDate(lastMonth.endOf("month"));
        break;

      case "Current year":
        setStartDate(today.startOf("year"));
        setEndDate(today);
        break;

      default:
        break;
    }
  };

  const handleApplyClick = () => {
    if (onApply && typeof onApply === "function") {
      onApply( startDate, endDate );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Autocomplete
            value={selectedRange}
            onChange={handleRangeChange}
            options={options}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Range" size="small" />
            )}
          />
          <DatePicker
            label="Start Date"
            value={startDate}
            maxDate={today}
            onChange={(newDate) => handleDateChange(newDate, "start")}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            maxDate={today}
            onChange={(newDate) => handleDateChange(newDate, "end")}
            slotProps={{ textField: { size: "small" } }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary">
          {`Selected range: ${endDate && startDate ? endDate.diff(startDate, "day") + 1 : 0} day(s)`}
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeSelector;
