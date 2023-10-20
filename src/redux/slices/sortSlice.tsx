import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    text: '',
  },
  reducers: {
    changeSort: (state: any, action) => {
      state.search = action.payload;
    },
    clearSort: (state: any) => {
        state.search = '';
      },
  },
});


export const getSearchData = (state: any) => state.sort.text;

export const { changeSort, clearSort } = sortSlice.actions;

export default sortSlice.reducer;

