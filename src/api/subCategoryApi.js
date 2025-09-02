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

export const addSubCategory = async (subCategoryData) => {
  try {
    const response = await axiosInstance.post(
      "/sub-categories",
      subCategoryData
    );
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
