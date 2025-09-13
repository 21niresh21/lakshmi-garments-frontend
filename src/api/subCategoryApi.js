import axiosInstance from "../config/axiosConfig";

export const fetchSubCategories = async (search = "") => {
  try {
    let url = "/sub-categories";
    if (search && search.trim() !== "") {
      url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await axiosInstance.get(url);
    console.log("Fetched SubCategories:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    throw error;
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
