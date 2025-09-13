import axiosInstance from "../config/axiosConfig";

const baseUrl = "/categories";

export const fetchCategories = async (search = "") => {
  try {
    let url = baseUrl;
    if (search.trim() !== "") {
      url += `?search=${encodeURIComponent(search.trim())}`;
    }

    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
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

export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/categories/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};
