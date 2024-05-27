/** @format */

import axios from "axios";
import { authRouter } from "../apis/api";

export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${authRouter}/update-user/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${authRouter}/delete-user/${id}`);
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

export const getDetailUser = async (id) => {
  try {
    const res = await axios.get(`${authRouter}/get-detail-user/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
