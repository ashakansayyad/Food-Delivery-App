import axios from "axios";
import { addTokenToHeader } from "../utils/auth";

// signup api
export const signup = async (data) => {
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/register`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

// login api
export const login = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/login`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res;
};

// add new address api
export const addAddress = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/user/address`,
    data,
    {
      headers,
    }
  );
  return res;
};

// get logged user all data
export const getUserData = async () => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/user/address`,
    {
      headers,
    }
  );
  return res;
};

//update user data
export const updateUserData = async (updatedData) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.patch( `${import.meta.env.VITE_BASE_URL}/api/user/updateUserData`, updatedData, {
    headers,
  });
  return res;
};
