/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
  isShowUpdateOrder: false,
  updateOrdetItem: null,
  isShowDeleteOrder: false,
};

export const orderSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setShowUpdateOrder: (state, action) => {
      state.isShowUpdateOrder = action.payload;
    },
    setUpdateOrderItem: (state, action) => {
      state.updateOrdetItem = action.payload;
    },
    setShowDeleteOrder: (state, action) => {
      state.isShowDeleteOrder = action.payload;
    },
  },
});

export const {
  setOrderId,
  setShowUpdateOrder,
  setUpdateOrderItem,
  setShowDeleteOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
