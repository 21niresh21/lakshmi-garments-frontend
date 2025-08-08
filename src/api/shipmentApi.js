import axiosInstance from "../config/axiosConfig";

export const createShipment = async (body) => {
  try {
    const response = await axiosInstance.post(`/shipments`, body);
    console.log(response);
    
    return response;
  } catch (error) {
    console.error("error creating shipment", error);
  }
};
