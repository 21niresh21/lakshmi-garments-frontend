import axiosInstance from "../config/axiosConfig";

const baseUrl = "/skills";

export const fetchSkills = async (search) => {
  let url = baseUrl;
  if (search) {
    url += `?search=${search}`;
  }
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("error fetching skills", error);
  }
};

export const addSkill = async (skillData) => {
  try {
    const response = await axiosInstance.post(baseUrl, skillData);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("error adding skill", error);
    throw error;
  }
};

export const updateSkill = async (skillId, skillData) => {
  try {
    const response = await axiosInstance.put(
      `${baseUrl}/${skillId}`,
      skillData
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("error updating skill", error);
    throw error;
  }
};
