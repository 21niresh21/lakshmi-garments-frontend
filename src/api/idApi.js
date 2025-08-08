import axiosInstance from "../config/axiosConfig";

export const fetchNextSerialCode = async (categoryName) => {
  try {
    const response = await axiosInstance.get(
      `/id/batch?categoryName=${categoryName}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("error fetching next serial code", error);
  }
};
