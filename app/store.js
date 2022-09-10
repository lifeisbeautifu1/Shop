import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import productsReducer from '../features/products/products';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
