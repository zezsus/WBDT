/** @format */
import axios from "axios";
import { productRouter } from "../apis/api";
export const getAllProduct = async ({ queryKey }) => {
  try {
    const [_, params] = queryKey;
    const res = await axios.get(`${productRouter}/get-product`, {
      params: params,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
