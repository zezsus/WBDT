/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdate: false,
  isAdminDelete: false,
  successMessage: "",
  errorMessage: "",
  isShowMessage: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsUpdate: (state, actions) => {
      state.isUpdate = actions.payload;
    },
    setAdminDelete: (state, actions) => {
      state.isAdminDelete = actions.payload;
    },
    setShowMessage: (state, action) => {
      state.isShowMessage = action.payload;
    },
    setSuccessMessage: (state, actions) => {
      state.successMessage = actions.payload;
    },
    setErrorMessage: (state, actions) => {
      state.errorMessage = actions.payload;
    },
  },
});

export const {
  setIsUpdate,
  setAdminDelete,
  setSuccessMessage,
  setErrorMessage,
  setShowMessage,
} = userSlice.actions;

export default userSlice.reducer;
