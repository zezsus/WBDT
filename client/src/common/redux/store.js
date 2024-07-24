/** @format */

import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice,
    carts: cartSlice,
    orders: orderSlice,
  },
});
