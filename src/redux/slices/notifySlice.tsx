import { createSlice } from "@reduxjs/toolkit";

interface INotify {
    text: string,
}

export const notifySlice = createSlice({
  name: "",
  initialState: {
    text: '',
  } as INotify,
  reducers: {
    changeText: (state: any, action) => {
      state.text = action.payload;
    },
    removeText: (state: any, action) => {
      state.text = '' 
    },
  },
});


export const getCartData = (state: any) => state.notify.text;

export const { changeText, removeText } = notifySlice.actions;

export default notifySlice.reducer;

