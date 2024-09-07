import { createSlice } from "@reduxjs/toolkit";

interface INotify {
    text: string,
    isShown: boolean
}

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    text: '',
    isShown: false
  } as INotify,
  reducers: {
    changeText: (state: {text: string}, action) => {
      state.text = action.payload;
    },
    removeText: (state: {text: string}) => {
      state.text = '' 
    },
    showNotify: (state: {isShown : boolean}) => {
      state.isShown = true;
    },
    hideNotify: (state: {isShown : boolean}) => {
      state.isShown = false
    },
  },
});


export const getNotifyData = (state: any) => state.notify.text;

export const getIsShown = (state: any) => state.notify.isShown;

export const { changeText, removeText, showNotify, hideNotify } = notifySlice.actions;

export default notifySlice.reducer;

