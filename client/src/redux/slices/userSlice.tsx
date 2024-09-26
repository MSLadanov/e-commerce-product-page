import { createSlice } from "@reduxjs/toolkit";

type StateType = null | string

interface UserData {
  token: StateType;
  id: StateType;
  name: StateType;
  surname: StateType;
  email: StateType;
  img: StateType;
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
      state = { ...action.payload};
    },
    signOut: (state) => {
      const propertiesToClear: (keyof UserData)[] = ['id', 'token', 'name', 'surname', 'img', 'email'];
      propertiesToClear.forEach((property) => {
        state[property] = null;
      });
    }
  },
});

export const getUserData = (state: UserData) => state;

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
