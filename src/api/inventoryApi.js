import axiosInstance from "../config/axiosConfig";

export const fetchCategorySubcategoryCount = async () => {
  try {
    const response = await axiosInstance.get("/inventories/categories/subcategory-counts");
    return response;
  } catch (error) {
    console.error("error fetching category count", error);
  }
};

export const fetchCategorySubCategoryCount = async (cat, subCat) => {
  try {
    const response = await axiosInstance.get(
      `/inventories/count?category=${cat}&subcategory=${subCat}`
    );
    return response.data;
  } catch (error) {
    console.error("error fetching category sub category count", error);
  }
};
