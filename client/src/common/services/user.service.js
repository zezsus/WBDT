/** @format */

import axios from "axios";
import { authRouter } from "../apis/api";

export const updateUser = async (id, data, accessToken) => {
  try {
    const res = await axios.put(`${authRouter}/update-user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
