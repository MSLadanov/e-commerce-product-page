import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
  data: CartSneaker[] | [];
}

interface CartSneaker {
  brand: string,
  cart_id: string,
  id: number,
  img: string,
  name: string,
  size: string,
  price: number,
}

export const cartSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  } as ICartState,
  reducers: {
    addSneaker: (state: ICartState, action) => {
      state.data = [...state.data, action.payload];
    },
    removeSneaker: (state: ICartState, action) => {
      state.data = state.data.filter((item : CartSneaker) => item.cart_id !== action.payload)
    },
  },
});


export const getCartData = (state: any) => state.cart.data;

export const { addSneaker, removeSneaker } = cartSlice.actions;

export default cartSlice.reducer;

