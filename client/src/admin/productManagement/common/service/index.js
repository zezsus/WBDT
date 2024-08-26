/** @format */

import axios from "axios";
import { productRouter } from "../../../../common/apis/api";

export const createProduct = async (newProduct, accessToken) => {
  try {
    const res = await axios.post(`${productRouter}/create`, newProduct, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res.data", res.data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, accessToken, dataUpdate) => {
  try {
    const res = await axios.put(
      `${productRouter}/update-product/${id}`,
      dataUpdate,
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

export const deleteProduct = async (id, accessToken) => {
  try {
    const res = await axios.delete(`${productRouter}/delete-product/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
