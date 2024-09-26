import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  token: null | string;
  id: string | null,
  name: string | null,
  surname: string | null,
  email: string | null,
  img: string | null, 
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    id: null,
    name: null,
    surname: null,
    email: null,
    img: null,
  } as UserData,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
    },
    fetchData: (state, action) => {
      state = {...action.payload, state };
    },
    signOut: (state) => {
      state = userSlice.getInitialState();
      state.token = null;
    },
  },
});

export const getToken = (state: UserData) => state.token;

export const getUserData = (state: UserData) => state;

export const { signIn, fetchData, signOut } = userSlice.actions;

export default userSlice.reducer;

