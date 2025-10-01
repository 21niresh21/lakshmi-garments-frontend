import axiosInstance from "../config/axiosConfig";

const baseUrl = "/suppliers";

export const fetchSuppliers = async (search) => {
  let url = baseUrl;
  if (search) {
    console.log(search);

    url += `?search=${search}`;
  }
  try {
    const response = await axiosInstance.get(url);
    console.log("dogs ",response);
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

export const updateSupplier = async (supplierId, updatedData) => {
  try {
    const response = await axiosInstance.patch(
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
