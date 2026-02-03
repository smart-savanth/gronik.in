import api from "./api";

// GET user by guid
export const getUserById = (guid) => {
  return api.get(`/user/getUserById/${guid}`);
};

// Get  all users

export const getAllUsers = (params) => api.post("/user/getAllusers", params);

// Update user
export const updateUser = (guid, data) => api.put(`/user/updateUser`, data);

// Block user / Delete user
export const blockUser = (guid) => {
  return api.post("/user/blockUser", { guid });
};

 // delete Account 
export const updateUserStatus = (guid) =>
  api.patch(`/user/updateStatus`, { guid });