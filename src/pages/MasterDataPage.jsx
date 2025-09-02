import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";

import AddTransportForm from "../features/data-management/AddTransportForm";
import AddSupplierForm from "../features/data-management/AddSupplierForm";
import AddCategoryForm from "../features/data-management/AddCategoryForm";
import AddSubCategoryForm from "../features/data-management/AddSubCategoryForm";

function MasterData() {
  const [refresh, setRefresh] = React.useState(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600} fontFamily={"Helvetica"}>
        Master Data Management
      </Typography>
      <Divider />

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <AddSupplierForm />
        </Grid>

        <Grid item xs={12} md={6}>
          <AddTransportForm />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }} spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <AddCategoryForm onRefresh={toggleRefresh} />
        </Grid>

        <Grid item xs={12} md={6}>
          <AddSubCategoryForm refresh={refresh} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MasterData;
