import { createSlice } from "@reduxjs/toolkit";

interface IITokenState {
  data: null | string;
}

export const cartSlice = createSlice({
  name: "data",
  initialState: {
    token: null,
    data: null,
  } as IITokenState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const getCart = (state: any) => state.user.token;

export const getCartData = (state: any) => state.user.data;

export const {  fetchData } = cartSlice.actions;

export default cartSlice.reducer;

