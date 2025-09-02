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

export const addSupplier = async (supplierData) => {
  try {
    const response = await axiosInstance.post("/suppliers", supplierData);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
