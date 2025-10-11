import axiosInstance from "../config/axiosConfig";

const baseUrl = "/inventories";

export const fetchAllCategorySubcategoryCount = async () => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/categories/subcategory-counts`
    );
    return response;
  } catch (error) {
    console.error("error fetching category count", error);
  }
};

export const fetchCategorySubCategoryCount = async (catId, subCatId) => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/count?category-id=${catId}&subcategory-id=${subCatId}`
    );
    return response.data;
  } catch (error) {
    console.error("error fetching category sub category count", error);
  }
};

export const fetchDistinctCategories = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/categories`);
    return response;
  } catch (error) {
    console.error("error fetching distinct categories", error);
  }
};

export const fetchSubCategoriesForCategory = async (catId) => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/sub-categories?category-id=${catId}`
    );
    return response;
  } catch (error) {
    console.error("error fetching sub categories", error);
  }
};
