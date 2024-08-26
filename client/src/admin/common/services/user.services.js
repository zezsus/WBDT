/** @format */

import axios from "axios";
import { authRouter } from "../../../common/apis/api";

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

export const getAllUser = async (page, accessToken) => {
  try {
    const res = await axios.get(`${authRouter}/get-all-user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
