import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', formData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/register', formData);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    return;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error?.response?.data?.errors);
  }
});

export const init = createAsyncThunk('/auth/init', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('error');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.errors = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(init.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { resetErrors } = authSlice.actions;

export default authSlice.reducer;
