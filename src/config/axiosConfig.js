import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Set the base URL of your API
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Track active requests
let activeRequests = 0;
const incrementRequests = () => {
  activeRequests += 1;
  window.dispatchEvent(new CustomEvent("active-requests-changed", { detail: activeRequests }));
};
const decrementRequests = () => {
  activeRequests = Math.max(activeRequests - 1, 0);
  window.dispatchEvent(new CustomEvent("active-requests-changed", { detail: activeRequests }));
};

// Request interceptor to add Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    config.headers[
      "X-CSRF-TOKEN"
    ] = `NhkSP5FcS4jqzvMZIRnCt-9N1PpIJTo-mScLVvIWVuy0k69LU3srW6Jpcu3Hq5F7GDT2hd4s-cMtFwsTrhdpYcIiYd_Vo5t7`; // Add CSRF token

    incrementRequests(); // Track new request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to catch network errors and track active requests
axiosInstance.interceptors.response.use(
  (response) => {
    decrementRequests(); // Request finished successfully
    return response;
  },
  (error) => {
    decrementRequests(); // Request finished with error

    // No response = network down or server unreachable
    if (!error.response) {
      // Trigger a global event that ConnectionChecker can listen to
      window.dispatchEvent(new CustomEvent("network-error"));
    }

    // Optionally, handle HTTP 5xx as connection down too
    if (!error.response ) {
      window.dispatchEvent(new CustomEvent("network-error"));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
