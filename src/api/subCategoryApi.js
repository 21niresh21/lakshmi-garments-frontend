import axiosInstance from "../config/axiosConfig";

export const fetchSubCategories = async () => {
  try {
    const response = await axiosInstance.get("/sub-categories");
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching sub categories", error);
  }
};