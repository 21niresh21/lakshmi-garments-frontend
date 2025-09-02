import axiosInstance from "../config/axiosConfig";

export const fetchUserRoles = async () => {
  try {
    const response = await axiosInstance.get("/roles");
    return response.data;
  } catch (error) {
    // console.error("Error fetching user roles", error);
    throw error;
  }
};

// Search Users with Query Parameters
export const getAllUsers = async (
  filters = undefined,
  page = 0,
  size = 10,
  sort = { field: "name", order: "desc" }
) => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      for (const filter in filters) {
        params.append(filter, filters[filter]);
      }
    }
    params.append("page", page);
    params.append("size", size);
    params.append("sortBy", sort.field);
    params.append("order", sort.order);

    const response = await axiosInstance.get(`/users?${params.toString()}`);
    // console.log("user data retrieved succes", response.data);
    console.log(`/users?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users", userData);
    console.log("User created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, userData);
    console.log("User updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
