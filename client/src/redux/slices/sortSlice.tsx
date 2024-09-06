import { createSlice } from "@reduxjs/toolkit";

interface SortTypeState {
  sort: {
    type: string
  }
}

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    type: '',
  },
  reducers: {
    changeSort: (state: {type: string}, action) => {
      state.type = action.payload;
    },
    clearSort: (state: {type: string}) => {
        state.type = '';
      },
  },
});


export const getSortData = (state: SortTypeState) => state.sort.type;

export const { changeSort, clearSort } = sortSlice.actions;

export default sortSlice.reducer;

