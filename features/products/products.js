import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  categories: ['All'],
  selectedCategory: 'All',
  searchTerm: '',
  order: 'desc',
  loading: false,
};

export const getProducts = createAsyncThunk(
  '/products/getProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const getCategories = createAsyncThunk(
  '/products/getCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/products/categories');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const searchProducts = createAsyncThunk(
  '/products/searchProducts',
  async (_, thunkAPI) => {
    try {
      const selectedCategory = thunkAPI.getState().products.selectedCategory;
      const searchTerm = thunkAPI.getState().products.searchTerm;
      const order = thunkAPI.getState().products.order;
      const { data } = await axios.get(
        `/products/search?category=${selectedCategory.toLowerCase()}&search=${searchTerm}&order=${order}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('error');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = ['All', ...action.payload];
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCategory, setSearchTerm, setOrder } =
  productsSlice.actions;

export default productsSlice.reducer;
