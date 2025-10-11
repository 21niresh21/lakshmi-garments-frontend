import axiosInstance from "../config/axiosConfig";

const baseUrl = "/batches";

export const createBatch = async (data) => {
  try {
    const response = await axiosInstance.post(baseUrl, data);
    console.log("Batch created successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating batch:", error);
  }
};

export const getBatches = async (sortBy, sortOrder = "desc") => {
  let url = baseUrl;
  if (sortBy ) {
    url += `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  }
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("Error getting batches:", error);
  }
};

export const getPendingBatches = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/pending`);
    return response;
  } catch (error) {
    console.error("Error getting pending batches:", error);
  }
};

export const getBatchTimeline = async (batchId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/timeline/${batchId}`);
    return response;
  } catch (error) {
    console.error("Error getting batch timeline:", error);
  }
};

export const getBatchCountById = async (batchId) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/count/${batchId}`);
    return response;
  } catch (error) {
    console.error("Error getting batch count:", error);
  }
};
