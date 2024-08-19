/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
  isShowDeleteOrder: false,
  isShowUpdate: false,
  updateItem: null,
};

export const orderSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setShowDeleteOrder: (state, action) => {
      state.isShowDeleteOrder = action.payload;
    },
    setShowUpdateOrder: (state, action) => {
      state.isShowUpdate = action.payload;
    },
    setUpdateItem: (state, action) => {
      state.updateItem = action.payload;
    },
  },
});

export const {
  setOrderId,
  setShowDeleteOrder,
  setShowUpdateOrder,
  setUpdateItem,
} = orderSlice.actions;

export default orderSlice.reducer;
