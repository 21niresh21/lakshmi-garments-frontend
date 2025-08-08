import axiosInstance from "../config/axiosConfig";


export const createStock = async (data) => {
    try {
      const response = await axiosInstance.post("/stocks", data);
      console.log("Stock created successfully:", response);
      return response.data;
    } catch (error) {
      console.error("Error creating stock:", error);
    }
}