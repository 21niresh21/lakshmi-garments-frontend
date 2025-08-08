import axiosInstance from "../config/axiosConfig";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching categories", error);
  }
};
