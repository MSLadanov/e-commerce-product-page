import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = null | string;

interface UserData {
  token: StateType;
  id: StateType;
  name: StateType;
  surname: StateType;
  email: StateType;
  img: StateType;
}

const initialState: UserData = {
  token: null,
  id: null,
  name: null,
  surname: null,
  email: null,
  img: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserData>) => {
      Object.assign(state, action.payload);
    },
    signOut: (state) => {
      const propertiesToClear: (keyof UserData)[] = ['id', 'token', 'name', 'surname', 'img', 'email'];
      propertiesToClear.forEach((property) => {
        state[property] = null;
      });
    },
  },
});


export const getUserData = (state: { user: UserData }) => state.user;

export const { signIn, signOut } = userSlice.actions;

// Экспорт редюсера
export default userSlice.reducer;