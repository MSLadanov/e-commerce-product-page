import { createSlice } from "@reduxjs/toolkit";

interface Search {
  search: {
    text : string,
  }
}

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: '',
  },
  reducers: {
    changeSearch: (state: {text : string}, action) => {
      state.text = action.payload;
    },
    clearSearch: (state: { text : string}) => {
        state.text = '';
      },
  },
});


export const getSearchData = (state: Search) => state.search.text;

export const { changeSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;

