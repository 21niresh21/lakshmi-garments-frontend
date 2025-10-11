import { useState } from "react";
import { Tabs, Tab, Box, Typography, Divider } from "@mui/material";
import MasterFormsTab from "../features/data-management/MasterForms";
import SupplierTab from "../features/data-management/SupplierTab";
import TransportTab from "../features/data-management/TransportTab";
import CategoryTab from "../features/data-management/CategoryTab";
import SubCategoryTab from "../features/data-management/SubCategoryTab";
import SnackbarAlert from "../components/SnackbarAlert";
import SkillTab from "../features/data-management/SkillTab";
import EmployeeTab from "../features/data-management/EmployeeTab";

export default function MasterDataPage() {
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
      {/* Header and Tabs Section (Fixed) */}
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h5" gutterBottom>
          Master Data Management
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

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="Forms" />
            <Tab label="Suppliers" />
            <Tab label="Transport" />
            <Tab label="Category" />
            <Tab label="Sub-Category" />
            <Tab label="Skill" />
            <Tab label="Employee" />
          </Tabs>
        </Box>
      </Box>

      {/* Scrollable Content Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mt: 2,
          p: 1,
        }}
      >
        {tab === 0 && <MasterFormsTab />}
        {tab === 1 && <SupplierTab showSnackbar={showSnackbar} />}
        {tab === 2 && <TransportTab showSnackbar={showSnackbar} />}
        {tab === 3 && <CategoryTab showSnackbar={showSnackbar} />}
        {tab === 4 && <SubCategoryTab showSnackbar={showSnackbar} />}
        {tab === 5 && <SkillTab showSnackbar={showSnackbar} />}
        {tab === 6 && <EmployeeTab showSnackbar={showSnackbar} />}
      </Box>

      {/* Snackbar (not scrollable) */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}
