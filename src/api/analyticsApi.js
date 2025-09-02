import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Set the base URL of your API
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export const getWeeklyInvoiceCount = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      `/analytics/invoices/weekly-count?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly invoice count:", error);
    throw error;
  }
};

export const getInvoiceCount = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      `/analytics/invoices/weekly-count?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice count:", error);
    throw error;
  }
};

export const getWeeklyTransportCost = async () => {
  try {
    const response = await axiosInstance.get(
      "/analytics/invoices/weekly-transport-cost"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly transport cost:", error);
    throw error;
  }
};

export const getCountOfUnpaidTranportInvoices = async () => {
  try {
    const response = await axiosInstance.get(
      "/analytics/invoices/unpaid-transport-bills-count"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching count of unpaid transport invoices:", error);
    throw error;
  }
};

export const getSupplierDelayData = async () => {
  try {
    const response = await axiosInstance.get(
      "/analytics/invoices/supplier-delay"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching supplier delay data:", error);
    throw error;
  }
};
