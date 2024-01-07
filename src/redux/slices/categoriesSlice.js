/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/categories';

export const fetchCategories = createAsyncThunk('categories/index', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error');
  }
});

const initialState = {
  loading: true,
  categoriesArr: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesArr = [];
      action.payload.forEach((el) => {
        state.categoriesArr.push(el);
      });
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
