/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameProduct: "",
  typeProduct: "",
  priceRange: "",
  companyProduct: "",
  cartProduct: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setNameProduct: (state, action) => {
      state.nameProduct = action.payload;
    },
    setTypeProduct: (state, action) => {
      state.typeProduct = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setCompanyProduct: (state, action) => {
      state.companyProduct = action.payload;
    },
    setCartProduct: (state, action) => {
      state.cartProduct = action.payload;
    },
  },
});

export const {
  setNameProduct,
  setTypeProduct,
  setPriceRange,
  setCompanyProduct,
  setCartProduct,
} = productSlice.actions;

export default productSlice.reducer;
