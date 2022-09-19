import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../interfaces';

interface IState {
  cartItems: IProduct[];
  total: number;
  subtotal: number;
  tax: number;
}

const initialState: IState = {
  cartItems: [],
  total: 0,
  subtotal: 0,
  tax: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems.push(action.payload);
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
