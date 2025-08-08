import axiosInstance from "../config/axiosConfig";

export const fetchInvoices = async (
  // pageNo = 0,
  // pageSize = 10,
  sortBy = "invoiceDate",
  sortDir = "asc",
  filters = {}
) => {
  try {
    // Construct query parameters dynamically
    const params = {
      // pageNo,
      // pageSize,
      sortBy,
      sortDir,
      ...filters, // Include filters like invoiceNumber, supplierNames, isPaid, invoiceDate
    };

    // If supplierNames is an array, convert it to a comma-separated string
    if (Array.isArray(params.supplierNames)) {
      params.supplierNames = params.supplierNames.join(",");
    }
    if (Array.isArray(params.transportNames)) {
      params.transportNames = params.transportNames.join(",");
    }
    if (Array.isArray(params.isPaid)) {
      if (params.isPaid.length === 0) {
        delete params.isPaid;
      } else params.isPaid = params.isPaid.join(",");
    }
    console.log(params);

    // Send GET request with query parameters
    const response = await axiosInstance.get("/invoices", { params });

    console.log("Invoices fetched successfully:", response);
    return response; // Assuming response.data contains the data you need
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error; // Rethrow error if needed
  }
};

export const fetchCompleteInvoice = async (id) => {
  try {
    const response = await axiosInstance.get(`/invoices/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching invoices", error);
  }
};

export const updateInvoice = async (id, body) => {
  try {
    const response = await axiosInstance.patch(`/invoices/${id}`, body);
    return response;
  } catch (error) {
    console.error("error fetching invoices", error);
  }
};
