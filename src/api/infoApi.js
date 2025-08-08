import axiosInstance from "../config/axiosConfig";

export const getNextLRNumber = async () => {
  try {
    const response = await axiosInstance.get("/id/lr");
    return response;
  } catch (error) {
    console.error("error fetching next LR Number", error);
  }
};
