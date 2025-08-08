import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Set the base URL of your API
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request interceptor to add Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage or store
    config.headers[
      "X-CSRF-TOKEN"
    ] = `NhkSP5FcS4jqzvMZIRnCt-9N1PpIJTo-mScLVvIWVuy0k69LU3srW6Jpcu3Hq5F7GDT2hd4s-cMtFwsTrhdpYcIiYd_Vo5t7`; // Add token to Authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
