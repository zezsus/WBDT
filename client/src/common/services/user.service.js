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

export const deleteUser = async (id, accessToken) => {
  try {
    const res = await axios.delete(`${authRouter}/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${authRouter}/get-all-user`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
