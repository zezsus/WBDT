/** @format */

import axios from "axios";
import { authRouter } from "../../../common/apis/api";

export const signInService = async (user) => {
  try {
    const res = await axios.post(`${authRouter}/sign-in`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signUpService = async (newUser) => {
  try {
    const res = await axios.post(`${authRouter}/sign-up`, newUser);
    return res.data;
  } catch (error) {
    console.log("Lỗi");
    throw error;
  }
};
