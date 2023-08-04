import { createSlice } from "@reduxjs/toolkit";

interface ISneaker {
    id: number,
    name: string,
    brand: string,
    price: number,
    size: string,
    img: string
}

interface ICartState {
  data: ISneaker[] | null;
}

export const cartSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  } as ICartState,
  reducers: {
    addSneaker: (state: any, action) => {
      state.data = [...state.data, action.payload];
    },
    removeSneaker: (state: any, action) => {
      state.data = state.data.filter((item : any) => item.cart_id !== action.payload)
    },
  },
});


export const getCartData = (state: any) => state.cart.data;

export const { addSneaker, removeSneaker } = cartSlice.actions;

export default cartSlice.reducer;

