// MasterFormsTab.jsx
import { Grid, Paper } from "@mui/material";
import SupplierForm from "./forms/SupplierForm";
import TransportForm from "./forms/TransportForm";
import CategoryForm from "./forms/CategoryForm";
import SubCategoryForm from "./forms/SubCategoryForm";
import { addSubCategory, updateSubCategory } from "../../api/subCategoryApi";
import SnackbarAlert from "../../components/SnackbarAlert";
import { useState } from "react";
import { addTransport } from "../../api/transportApi";
import { addSupplier } from "../../api/supplierApi";
import { addCategory } from "../../api/categoryApi";
import SkillForm from "./forms/SkillForm";
import { addSkill } from "../../api/skillApi";
import EmployeeForm from "./forms/EmployeeForm";
import { addEmployee } from "../../api/employeeApi";
export default function MasterFormsTab() {
  const [errors, setErrors] = useState({
    subCategoryName: "",
    transportName: "",
    supplierName: "",
    supplierLocation: "",
    categoryName: "",
    categoryCode: "",
    skillName: "",
    skills: [],
  });
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

  const handleAddSupplier = (supplier, onSuccess) => {
    addSupplier(supplier)
      .then((response) => {
        showSnackbar("Supplier added successfully!", "success");
        setErrors({ supplierName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({ ...prev, supplierName: error.response.data }));
      });
  };

  const handleAddCategory = (category, onSuccess) => {
    addCategory(category)
      .then((response) => {
        showSnackbar("Category added successfully!", "success");
        setErrors({ categoryName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({
          ...prev,
          categoryName: error.response.data.includes(
            "Category with the same name already exists"
          )
            ? error.response.data
            : "",
          categoryCode: error.response.data.includes("Category Code")
            ? error.response.data
            : "",
        }));
      });
  };

  const handleAddSubCategory = (subCategory, onSuccess) => {
    addSubCategory(subCategory)
      .then((response) => {
        showSnackbar("Sub-category added successfully!", "success");
        setErrors({ subCategoryName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);

        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({
          ...prev,
          subCategoryName: error.response.data,
        }));
      });
  };

  const handleAddTransport = (transport, onSuccess) => {
    addTransport(transport)
      .then((response) => {
        showSnackbar("Transport added successfully!", "success");
        setErrors({ transportName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({ ...prev, transportName: error.response.data }));
      });
  };

  const handleAddSkill = (skill, onSuccess) => {
    addSkill(skill)
      .then((response) => {
        showSnackbar("Skill added successfully!", "success");
        setErrors({ skillName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({ ...prev, skillName: error.response.data }));
      });
  };

  const handleAddEmployee = (employee, onSuccess) => {
    addEmployee(employee)
      .then((response) => {
        showSnackbar("Employee added successfully!", "success");
        setErrors({ employeeName: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          showSnackbar("Network error. Please try again later.", "error");
          return;
        }
        setErrors((prev) => ({ ...prev, employeeName: error.response.data }));
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <SupplierForm initialErrors={errors} onSubmit={handleAddSupplier} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <TransportForm
              initialErrors={errors}
              onSubmit={handleAddTransport}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <CategoryForm initialErrors={errors} onSubmit={handleAddCategory} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <SubCategoryForm
              initialErrors={errors}
              onSubmit={handleAddSubCategory}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <SkillForm initialErrors={errors} onSubmit={handleAddSkill} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <EmployeeForm initialErrors={errors} onSubmit={handleAddEmployee} />
          </Paper>
        </Grid>
      </Grid>
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}
