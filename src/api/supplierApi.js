import axiosInstance from "../config/axiosConfig";

export const fetchSuppliers = async () => {
  try {
    const response = await axiosInstance.get("/suppliers");
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching suppliers", error);
  }
};
