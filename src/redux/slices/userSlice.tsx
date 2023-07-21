import { createSlice } from "@reduxjs/toolkit";

interface IIState {
  token: null | string;
}

export const userSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  } as IIState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
    },
    signOut: (state) => {
      state.token = null;
    },
  },
});

export const getToken = (state: any) => state.user.token;

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
