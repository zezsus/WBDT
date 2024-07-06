/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdate: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsUpdate: (state, actions) => {
      state.isUpdate = actions.payload;
    },
  },
});

export const { setIsUpdate } = userSlice.actions;

export default userSlice.reducer;
