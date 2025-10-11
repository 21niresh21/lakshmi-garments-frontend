import axiosInstance from "../config/axiosConfig";

const baseUrl = "/employees";

export const fetchEmployees = async (search) => {
  let url = baseUrl;
  if (search) {
    url += `?search=${search}`;
  }
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching employees", error);
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post(baseUrl, employeeData);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("error adding employee", error);
    throw error;
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axiosInstance.put(
      `${baseUrl}/${employeeId}`,
      employeeData
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("error updating employee", error);
    throw error;
  }
};
