import { createSlice } from "@reduxjs/toolkit";

interface IUserData {
  data: any;
}

export const userDataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
  } as IUserData,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    wipeData: (state) => {
      state.data = null;
    },
  },
});

export const getToken = (state: any) => state.user.data;

export const { getData, wipeData } = userDataSlice.actions;

export default userDataSlice.reducer;
