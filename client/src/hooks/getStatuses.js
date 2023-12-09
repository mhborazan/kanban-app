import axios from "axios";

export default async () => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL);
    return data.data;
  } catch (error) {}
};
