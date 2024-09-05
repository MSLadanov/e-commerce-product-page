import { createSlice } from "@reduxjs/toolkit";

interface IITokenState {
  token: null | string;
  data: null | UserData;
}

interface UserData {
  id: string,
  name: string,
  surname: string,
  email: string,
  img: string,
}

export const userSlice = createSlice({
  name: "data",
  initialState: {
    token: null,
    data: null,
  } as IITokenState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
    },
    fetchData: (state, action) => {
      state.data = action.payload;
    },
    signOut: (state) => {
      state.data = null;
      state.token = null;
    },
  },
});

export const getToken = (state: {user: IITokenState}) => state.user.token;

export const getUserData = (state: {user: IITokenState}) => state.user.data;

export const { signIn, fetchData, signOut } = userSlice.actions;

export default userSlice.reducer;

