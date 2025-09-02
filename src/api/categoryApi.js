import axiosInstance from "../config/axiosConfig";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response;
  } catch (error) {
    console.error("error fetching categories", error);
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/categories", categoryData);
    return response;
  } catch (error) {
    throw error;
  }
};
