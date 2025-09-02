import React, { useEffect, useState } from "react";
import WeeklyInvoiceSparkline from "./WeeklyInvoiceSparkline";
import WeeklyTransportCostSparkline from "./WeeklyTransportCostSparkline";
import { Grid, Box, Typography, Button } from "@mui/material";
import SupplierDelayBoxPlot from "./SupplierDelayBoxPlot";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ChipAutocomplete from "./ChipAutocomplete";
import DateRangePicker from "../../../components/DateRangePicker";
import isoWeek from "dayjs/plugin/isoWeek";
import { getInvoiceCount, getWeeklyInvoiceCount } from "../../../api/analyticsApi";

function InvoiceAnalytics() {
  const mondayThisWeek = dayjs().startOf("isoWeek");
  const [startDate, setStartDate] = useState(mondayThisWeek);
  const [endDate, setEndDate] = useState(dayjs());
  const [invoiceCountData, setInvoiceCountData] = useState([]);

  const lastDays = endDate.diff(startDate, "day") + 1;

  const handleDateChange = (newStart, newEnd) => {
    if (newStart && newEnd) {
      setStartDate(newStart);
      setEndDate(newEnd);
    }
    console.log(
      `Selected range: ${newStart.format("YYYY-MM-DD")} to ${newEnd.format(
        "YYYY-MM-DD"
      )}`
    );
  };

  useEffect(() => {
    getInvoiceCount(
      startDate.format("YYYY-MM-DD"),
      endDate.format("YYYY-MM-DD")
    )
      .then((res) => {
        setInvoiceCountData(res);
      })
      .catch((error) => {
        console.error("Error fetching weekly invoice count:", error);
      });
  }, [startDate, endDate]);
  return (
    // <div>
    //   <LocalizationProvider dateAdapter={AdapterDayjs} >
    //   <Grid container spacing={2}>
    //   {/* Start Date */}
    //   <Grid item xs={12} sm={4} xl={5}>
    //     <DatePicker label="Start Date" sx={{width: "100%"}} />
    //   </Grid>

    //   {/* End Date */}
    //   <Grid item xs={12} sm={4} xl={5}>
    //     <DatePicker label="End Date" />
    //   </Grid>

    //   {/* Apply Button */}
    //   <Grid item xs={12} sm={4} xl={2}>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       fullWidth
    //       sx={{ height: "100%" }}
    //     >
    //       Apply
    //     </Button>
    //   </Grid>
    // </Grid>
    //   </LocalizationProvider>

    //   {/* KPIs */}
    //   <Grid container spacing={8}>
    //     <Grid item xs={6} md={3}>
    //       <WeeklyInvoiceSparkline />
    //     </Grid>
    //     <Grid item xs={6} md={3}>
    //       <WeeklyTransportCostSparkline />
    //     </Grid>
    //     <Grid item xs={6} md={3}>
    //       {/* <AverageInvoiceCostSparkline /> */}
    //     </Grid>
    //     <Grid item xs={6} md={3}>
    //       {/* <PaidPercentageSparkline /> */}
    //     </Grid>
    //   </Grid>

    //   {/* Charts */}
    //   <Grid container spacing={8} sx={{ marginTop: -2 }}>
    //     <Grid item xs={12} md={6}>
    //       <SupplierDelayBoxPlot />
    //       <ChipAutocomplete />
    //     </Grid>
    //   </Grid>
    // </div>
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} xl={12}>
          <DateRangePicker onApply={handleDateChange} />
        </Grid>
        <Grid item xs={12} sm={4} xl={2.4}>
          {invoiceCountData && (
            <WeeklyInvoiceSparkline result={invoiceCountData} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default InvoiceAnalytics;
