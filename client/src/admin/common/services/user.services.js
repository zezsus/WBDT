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

export const getAllUser = async (accessToken) => {
  try {
    const res = await axios.get(`${authRouter}/get-all-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
