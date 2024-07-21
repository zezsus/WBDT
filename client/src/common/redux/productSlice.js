/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameProduct: "",
  typeProduct: "",
  priceRange: "",
  brandProduct: "",
  isShowFilter: false,
  isShowSlider: true,
  isShowCreate: false,
  isShowUpdate: false,
  isShowDelete: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShowSlider: (state, action) => {
      state.isShowSlider = action.payload;
    },
    setNameProduct: (state, action) => {
      state.nameProduct = action.payload;
    },
    setTypeProduct: (state, action) => {
      state.typeProduct = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setBrandProduct: (state, action) => {
      state.brandProduct = action.payload;
    },
    setShowFilter: (state, action) => {
      state.isShowFilter = action.payload;
    },
    setShowCreate: (state, action) => {
      state.isShowCreate = action.payload;
    },
    setShowUpdate: (state, action) => {
      state.isShowUpdate = action.payload;
    },
    setShowDelete: (state, action) => {
      state.isShowDelete = action.payload;
    },
  },
});

export const {
  setShowSlider,
  setNameProduct,
  setTypeProduct,
  setPriceRange,
  setBrandProduct,
  setShowFilter,
  setShowCreate,
  setShowUpdate,
  setShowDelete,
} = productSlice.actions;

export default productSlice.reducer;
