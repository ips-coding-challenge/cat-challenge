import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";

export const fetchBreeds = async () => {
  return await axios.get("/api/breeds");
};

export const fetchBreedById = async (id) => {
  return await axios.get(`/api/breeds/${id}`);
};

export const fetchPopularBreeds = async () => {
  return await axios.get("/api/breeds/popular");
};

export const incrementViews = async (item) => {
  const { id, name, description } = item;
  console.log(`Increment views called`, item);
  return await axios.post("/api/breeds", {
    id,
    name,
    description,
  });
};

export const fetchImages = async (id) => {
  return await axios.get("/api/images/search", { params: { breed_id: id } });
};

export default axios;
