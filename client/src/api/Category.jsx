import axios from "axios";

export const listCategory = async (token) => {
  return await axios.get("https://ecom2024-api.vercel.app/api/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCategory = async (token, data) => {
  return await axios.post("https://ecom2024-api.vercel.app/api/category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (token, id) => {
  return await axios.delete(
    "https://ecom2024-api.vercel.app/api/category/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
