import axiosInstance from "../config/axiosConfig";

export const fetchTransports = async () => {
  try {
    const response = await axiosInstance.get("/transports");
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching transports", error);
  }
};

export const addTransport = async (transportData) => {
  try {
    const response = await axiosInstance.post("/transports", transportData);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
