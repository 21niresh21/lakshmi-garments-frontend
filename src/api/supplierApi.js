import axiosInstance from "../config/axiosConfig";

const baseUrl = "/suppliers";

export const fetchSuppliers = async (search) => {
  let url = baseUrl;
  if (search) {
    url += `?search=${search}`;
  }
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching suppliers", error);
  }
};

export const addSupplier = async (supplierData) => {
  try {
    const response = await axiosInstance.post(baseUrl, supplierData);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSupplier = async (supplierId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `${baseUrl}/${supplierId}`,
      updatedData
    );
    console.log("Supplier updated:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
};
