import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const fetchBreeds = async () => {
  return await axios.get("/breeds");
};

export const fetchBreedById = async (id) => {
  return await axios.get(`/breeds/${id}`);
};

export const fetchPopularBreeds = async () => {
  return await axios.get("/breeds/popular");
};

export const incrementViews = async (item) => {
  const { id, name, description } = item;
  console.log(`Increment views called`, item);
  return await axios.post("/breeds", {
    id,
    name,
    description,
  });
};

export const fetchImages = async (id) => {
  return await axios.get("/images/search", { params: { breed_id: id } });
};

export default axios;
