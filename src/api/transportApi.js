import axiosInstance from "../config/axiosConfig";

const baseUrl = "/transports";

export const fetchTransports = async (search = "") => {
  let url = baseUrl;
  if (search.trim() !== "") {
    url += `?search=${encodeURIComponent(search)}`;
  }

  try {
    const response = await axiosInstance.get(url);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching transports", error);
  }
};


export const addTransport = async (transportData) => {
  try {
    const response = await axiosInstance.post(baseUrl, transportData);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTransport = async (transportId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/transports/${transportId}`,
      updatedData
    );
    console.log("Transport updated:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating transport:", error);
    throw error;
  }
};
