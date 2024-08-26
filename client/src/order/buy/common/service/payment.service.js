/** @format */

import axios from "axios";
import { paymentRouter } from "../../../../common/apis/api";

export const getPayment = async (accessToken) => {
  try {
    const res = await axios.get(`${paymentRouter}/paypal-payment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
