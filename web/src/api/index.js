import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001/myunsplash/us-central1/app";

export const fetchBreeds = async () => {
  return await axios.get("/breeds");
};

export const fetchPopularBreeds = async () => {
  return await axios.get("/breeds/popular");
};

export const incrementViews = async (params) => {
  return await axios.post("/breeds", params);
};
