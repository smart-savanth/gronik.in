import api from "./api";

// Save a new review
export const saveReview = (data) => api.post("/review/saveReview", data);

// Get all reviews with pagination
export const getAllReviews = (params) => api.get("/review/getAllReviews", params);
