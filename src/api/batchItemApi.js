import axiosInstance from "../config/axiosConfig";

const baseUrl = "/batch-items";

export const getItemsByBatchId = async (batchId) => {
  if (!batchId) {
    return;
  }
  try {
    const response = await axiosInstance.get(`${baseUrl}/batch/${batchId}`);
    return response;
  } catch (error) {
    console.error("error fetching items by batch id", error);
  }
};
