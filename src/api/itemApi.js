import axiosInstance from "../config/axiosConfig";

const baseUrl = "/items";

export const fetchItems = async () => {
  try {
    const response = await axiosInstance.get(baseUrl);
    return response;
  } catch (error) {
    console.error("error fetching items", error);
  }
};


