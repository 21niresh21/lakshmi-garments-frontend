import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Tabs, Tab, Grid } from "@mui/material";

import AddTransportForm from "../features/data-management/AddTransportForm";
import AddSupplierForm from "../features/data-management/AddSupplierForm";
import AddCategoryForm from "../features/data-management/AddCategoryForm";
import AddSubCategoryForm from "../features/data-management/AddSubCategoryForm";
import Suppliers from "../features/data-management/Suppliers";
import { fetchSuppliers, updateSupplier } from "../api/supplierApi";
import Transports from "../features/data-management/Transports";
import { fetchTransports, updateTransport } from "../api/transportApi";
import { fetchCategories, updateCategory } from "../api/categoryApi";
import { fetchSubCategories } from "../api/subCategoryApi";
import Categories from "../features/data-management/Categories";
import SubCategories from "../features/data-management/SubCategories";
import SnackbarAlert from "../components/SnackbarAlert";
import { Refresh } from "@mui/icons-material";

// Reusable TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function MasterData() {
  const [refresh, setRefresh] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [transports, setTransports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [supplierSearchQuery, setSupplierSearchQuery] = useState("");
  const [transportSearchQuery, setTransportSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [subcategorySearchQuery, setSubcategorySearchQuery] = useState("");
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

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdateSupplier = (updatedSupplier) => {
    updateSupplier(updatedSupplier.id, {
      name: updatedSupplier.name,
      location: updatedSupplier.location,
    })
      .then(() => {
        setRefresh(!refresh);
        showSnackbar("Supplier updated successfully!", "success");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          showSnackbar(err.response.data, "error");
        } else {
          showSnackbar(
            "Failed to update Supplier. An error occurred!",
            "error"
          );
        }
      });
  };

  const handleUpdateTransport = (updatedTransport) => {
    updateTransport(updatedTransport.id, {
      name: updatedTransport.name,
    })
      .then(() => {
        setRefresh(!refresh);
        showSnackbar("Transport updated successfully!", "success");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          showSnackbar(err.response.data, "error"); // Duplicate name
        } else {
          showSnackbar(
            "Failed to update Transport. An error occurred!",
            "error"
          );
        }
      });
  };

const handleUpdateCategory = (updatedCategory) => {
  updateCategory(updatedCategory.id, {
    name: updatedCategory.name,
    code: updatedCategory.code,
  })
    .then(() => {
      setRefresh((prev) => !prev); // refresh data
      showSnackbar("Category updated successfully!", "success");
    })
    .catch((err) => {
      if (err.response?.status === 409) {
        // Conflict: duplicate name or code
        showSnackbar(err.response.data, "error");
      } else {
        showSnackbar("Failed to update category. An error occurred!", "error");
      }
    });
};


  const handleUpdateSubCategory = (updatedSubCategory) => {
    console.log(updatedSubCategory);
  };

  useEffect(() => {
    fetchSuppliers(supplierSearchQuery).then((data) => {
      setSuppliers(data.data.content);
    });
  }, [refresh, supplierSearchQuery]);

  useEffect(() => {
    fetchTransports(transportSearchQuery).then((data) => {
      setTransports(data.data.content);
    });
  }, [refresh, transportSearchQuery]);

  useEffect(() => {
    fetchCategories(categorySearchQuery).then((data) => {
      setCategories(data.data.content);
    });
  }, [categorySearchQuery, refresh]);

  useEffect(() => {
    fetchSubCategories(subcategorySearchQuery).then((data) => {
      setSubCategories(data.data.content);
    });
  }, [subcategorySearchQuery, refresh]);

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          fontFamily={"Helvetica"}
        >
          Master Data Management
        </Typography>
        <Divider />
      </Box>

      {/* Tabs Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="master data tabs"
        >
          <Tab label="Add" />
          <Tab label="Suppliers" />
          <Tab label="Transports" />
          <Tab label="Categories" />
          <Tab label="Sub-Categories" />
        </Tabs>
      </Box>

      {/* Tab 0: All Forms */}
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AddSupplierForm onRefresh={toggleRefresh} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddTransportForm onRefresh={toggleRefresh} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <AddCategoryForm onRefresh={toggleRefresh} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddSubCategoryForm refresh={refresh} />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 1: Coming Soon */}
      <TabPanel value={value} index={1}>
        <Suppliers
          data={suppliers}
          onSave={handleUpdateSupplier}
          searchQuery={supplierSearchQuery}
          handleSearchQueryChange={setSupplierSearchQuery}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Transports
          data={transports}
          onSave={handleUpdateTransport}
          searchQuery={transportSearchQuery}
          handleSearchQueryChange={setTransportSearchQuery}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Categories
          data={categories}
          onSave={handleUpdateCategory}
          searchQuery={categorySearchQuery}
          handleSearchQueryChange={setCategorySearchQuery}
        />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <SubCategories
          data={subCategories}
          categories={categories}
          onSave={handleUpdateSubCategory}
          searchQuery={subcategorySearchQuery}
          handleSearchQueryChange={setSubcategorySearchQuery}
        />
      </TabPanel>
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}

export default MasterData;
