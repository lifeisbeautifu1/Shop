import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../interfaces';

interface ICartProduct extends IProduct {
  quantity: number;
}

interface IState {
  cartItems: ICartProduct[];
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
      if (state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems = state.cartItems.map((item) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    incrementProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
    decrementProduct: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item;
      });
      state.subtotal = state.cartItems.reduce((total, product) => {
        return (total = total + product.price * product.quantity);
      }, 0);
      state.tax = state.subtotal / 50;
      state.total = state.subtotal + state.tax;
    },
  },
});

export const { addProduct, removeProduct, incrementProduct, decrementProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
