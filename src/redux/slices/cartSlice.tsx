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
  },
});


export const getCartData = (state: any) => state.cart.data;

export const { addSneaker } = cartSlice.actions;

export default cartSlice.reducer;

