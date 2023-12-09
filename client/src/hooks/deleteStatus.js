import axios from "axios";

export default async (id) => {
  try {
    const { data } = await axios.delete(import.meta.env.VITE_BASE_URL + id);
    return true;
  } catch (error) {
    return false;
  }
};
