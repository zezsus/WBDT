/** @format */

import axios from "axios";
import { authRouter } from "../../../common/apis/api";

export const getDetailUser = async (id, accessToken) => {
  try {
    const res = await axios.get(`${authRouter}/get-detail-user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
