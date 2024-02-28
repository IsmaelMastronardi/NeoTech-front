import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const url = 'http://localhost:3000/api/v1/categories';

export const fetchCategories = createAsyncThunk('categories/index', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    NotificationManager.error('Error loading categories', 'Error');
    throw new Error('Error');
  }
});

const initialState = {
  categoriesLoading: true,
  categoriesFetched: false,
  categoriesArr: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesArr = [];
        state.categoriesArr = [
          { name: 'All', id: 0 },
          ...action.payload,
        ];
        state.categoriesLoading = false;
        state.categoriesFetched = true;
      });
  },
});

export default categoriesSlice.reducer;
