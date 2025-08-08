import axiosInstance from "../config/axiosConfig";

export const fetchCategoryCount = async () => {
  try {
    const response = await axiosInstance.get("/inventories/categoryCount");
    return response;
  } catch (error) {
    console.error("error fetching category count", error);
  }
};

export const fetchCategorySubCategoryCount = async (cat, subCat) => {
  try {
    const response = await axiosInstance.get(
      `/inventories/search?category=${cat}&subCategory=${subCat}`
    );
    return response.data;
  } catch (error) {
    console.error("error fetching category sub category count", error);
  }
};
