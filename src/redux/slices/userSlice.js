/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const fetchUser = createAsyncThunk('user/show', async () => {
  try {
    const response = await axios(`${url}users/64`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  loading: true,
  user: undefined,
  cart: [],
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload[0];
      state.cart = action.payload[1];
    });
  },
});

export default userSlice.reducer;
