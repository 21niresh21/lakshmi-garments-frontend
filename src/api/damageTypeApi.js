import axiosInstance from "../config/axiosConfig";

const baseUrl = "/damage-types";

export const fetchDamageTypes = async () => {
  try {
    const response = await axiosInstance.get(baseUrl);
    return response;
  } catch (error) {
    console.error("Error fetching damage types:", error);
    throw error;
  }
};
