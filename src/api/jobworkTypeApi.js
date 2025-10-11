import axiosInstance from "../config/axiosConfig";

const baseUrl = "/jobwork-types";

export const fetchJobworkTypes = async () => {
  try {
    const response = await axiosInstance.get(baseUrl);
    return response;
  } catch (error) {
    console.error("Error fetching jobwork types", error);
  }
};

export const fetchJobworkTypeForBatchId = async (id) => {
  let url = `batches/${id}/jobwork-types`;
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching jobwork type for batch id", error);
  }
};
