/** @format */

import axios from "axios";
import { cartRouter } from "../apis/api";

export const createCart = async (userId, data, accessToken) => {
  try {
    const res = await axios.post(`${cartRouter}/create/${userId}`, data, {
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

export const deleteCart = async (userId, productId, accessToken) => {
  try {
    const res = await axios.put(
      `${cartRouter}/delete/${userId}`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
