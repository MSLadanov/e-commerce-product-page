import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    type: '',
  },
  reducers: {
    changeSort: (state: any, action) => {
      state.type = action.payload;
    },
    clearSort: (state: any) => {
        state.type = '';
      },
  },
});


export const getSortData = (state: any) => state.sort.type;

export const { changeSort, clearSort } = sortSlice.actions;

export default sortSlice.reducer;

