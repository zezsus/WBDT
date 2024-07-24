/** @format */

import axios from "axios";
import { orderRouter } from "../apis/api";

export const createOrder = async (newOrder, userId, accessToken) => {
  try {
    const res = await axios.post(`${orderRouter}/create/${userId}`, newOrder, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailOrder = async (orderId) => {
  try {
    const res = await axios.get(`${orderRouter}/get-order-detail/${orderId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrderDetail = async (userId, accessToken) => {
  try {
    const res = await axios.get(
      `${orderRouter}/get-all-order-detail/${userId}`,
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

export const getAllOrder = async (page) => {
  try {
    const res = await axios.get(`${orderRouter}/get-order?page=${page}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (orderId, data, accessToken) => {
  try {
    const res = await axios.put(
      `${orderRouter}/update-order/${orderId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (userId, orderId, accessToken) => {
  try {
    const res = await axios.delete(`${orderRouter}/cancel-order/${userId}`, {
      data: { orderId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
