import { createSlice } from "@reduxjs/toolkit";

interface INotify {
    text: string,
    isShown: Boolean
}

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    text: '',
    isShown: false
  } as INotify,
  reducers: {
    changeText: (state: any, action) => {
      state.text = action.payload;
    },
    removeText: (state: any) => {
      state.text = '' 
    },
    showNotify: (state: any) => {
      state.isShown = true;
    },
    hideNotify: (state: any) => {
      state.isShown = false
    },
  },
});


export const getCartData = (state: any) => state.notify.text;

export const { changeText, removeText, showNotify, hideNotify } = notifySlice.actions;

export default notifySlice.reducer;

