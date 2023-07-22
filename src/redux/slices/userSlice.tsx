import { createSlice } from "@reduxjs/toolkit";

interface IITokenState {
  token: null | string;
  data: null | string
}

export const userSlice = createSlice({
  name: "data",
  initialState: {
    token: null,
    data: null
  } as IITokenState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
    },
    signOut: (state) => {
      state.token = null;
    },
    fetchData: (state, action) => {
      state.data = action.payload;
    },
    wipeData: (state) => {
      state.data = null;
    },
  },
});

export const getToken = (state: any) => state.user.token;

export const getUserData = (state: any) => state.user.data;

export const { signIn, signOut, fetchData, wipeData } = userSlice.actions;

export default userSlice.reducer;

