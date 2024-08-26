/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDelete: false,
  productId: null,
};

export const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShowDelete: (state, action) => {
      state.isShowDelete = action.payload;
    },
    setProductCartId: (state, action) => {
      state.productId = action.payload;
    },
  },
});

export const { setShowDelete, setProductCartId } = cartSlice.actions;

export default cartSlice.reducer;
