import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: '',
  },
  reducers: {
    changeSearch: (state: any, action) => {
      state.search = action.payload;
    },
    clearSearch: (state: any) => {
        state.search = '';
      },
  },
});


export const getSearchData = (state: any) => state.search.text;

export const { changeSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;

