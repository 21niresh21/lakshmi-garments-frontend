// MasterDataPage.jsx
import { useState } from "react";
import { Tabs, Tab, Box, Typography, Divider } from "@mui/material";
import MasterFormsTab from "../features/data-management/MasterForms";
import SupplierTab from "../features/data-management/SupplierTab";
import SnackbarAlert from "../components/SnackbarAlert";
import TransportTab from "../features/data-management/TransportTab";
import CategoryTab from "../features/data-management/CategoryTab";
import SubCategoryTab from "../features/data-management/SubCategoryTab";
// import MasterFormsTab from "./tabs/MasterFormsTab";
// import SupplierTableTab from "./tabs/SupplierTableTab";
// import TransportTableTab from "./tabs/TransportTableTab";
// import CategoryTableTab from "./tabs/CategoryTableTab";
// import SubCategoryTableTab from "./tabs/SubCategoryTableTab";

export default function MasterDataPage() {
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error", "warning", "info"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Master Data Management
      </Typography>
      <Divider
        sx={{
          bgcolor: "#fff",
          borderColor: "#fff",
          ml: -3.5,
          mr: -3.5,
          height: 2,
          mb: 1,
        }}
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab label="Forms" />
          <Tab label="Suppliers" />
          <Tab label="Transport" />
          <Tab label="Category" />
          <Tab label="Sub-Category" />
        </Tabs>
      </Box>

      <Box sx={{ pt: 2 }}>
        {tab === 0 && <MasterFormsTab />}
        {tab === 1 && <SupplierTab showSnackbar={showSnackbar} />}
        {tab === 2 && <TransportTab showSnackbar={showSnackbar} />}
        {tab === 3 && <CategoryTab showSnackbar={showSnackbar} />}
        {tab === 4 && <SubCategoryTab showSnackbar={showSnackbar} />}
      </Box>
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}
