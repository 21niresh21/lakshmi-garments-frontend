import axiosInstance from "../config/axiosConfig";

export const createBatch = async (data) => {
  try {
    const response = await axiosInstance.post("/batches", data);
    console.log("Batch created successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating batch:", error);
  } 
};

export const getBatches = async (search) => {
  try {
    const response = await axiosInstance.get(`/batches?search=${search}`);
    return response.data;
  } catch (error) {
    console.error("Error getting batches:", error);
  }
};
