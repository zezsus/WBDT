/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProduct: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      state.cartProduct = action.payload;
    },
  },
});

export const { setCartProduct } = productSlice.actions;

export default productSlice.reducer;
