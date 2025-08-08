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
