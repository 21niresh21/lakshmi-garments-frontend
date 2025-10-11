import axiosInstance from "../config/axiosConfig";

const baseUrl = "/jobworks";

export const fetchJobworkNumbers = async () => {
  let url = baseUrl + "/jobwork-numbers";
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching jobwork numbers", error);
  }
};

export const fetchJobworkDetailsByNumber = async (jobworkNumber) => {
  let url = baseUrl + `/jobwork-numbers/${jobworkNumber}`;
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching jobwork details", error);
  }
};

export const getNextJobworkNumber = async () => {
  let url = baseUrl + "/jobwork-numbers/next-number";
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching next jobwork number", error);
  }
};

export const createJobwork = async (jobwork) => {
  try {
    const response = await axiosInstance.post(baseUrl, jobwork);
    return response;
  } catch (error) {
    console.error("error creating jobwork", error);
  }
};
