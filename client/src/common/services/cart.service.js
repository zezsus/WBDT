/** @format */

import axios from "axios";
import { cartRouter } from "../apis/api";

export const createCart = async (data, accessToken) => {
  try {
    const res = await axios.post(`${cartRouter}/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const res = await axios.get(`${cartRouter}/get-cart/${userId}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (cartId, accessToken) => {
  try {
    const res = await axios.delete(`${cartRouter}/delete/${cartId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
