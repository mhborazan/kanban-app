import axios from "axios";

export default async (statuses) => {
  try {
    const { data } = await axios.put(import.meta.env.VITE_BASE_URL, {
      statuses,
    });
  } catch (error) {}
};
