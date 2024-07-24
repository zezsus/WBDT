/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDelete: false,
  cartId: null,
};

export const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShowDelete: (state, action) => {
      state.isShowDelete = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
  },
});

export const { setShowDelete, setCartId } = cartSlice.actions;

export default cartSlice.reducer;
