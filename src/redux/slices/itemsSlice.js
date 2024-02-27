import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const url = 'http://localhost:3000/api/v1/';

export const fetchTopTenItems = createAsyncThunk('items/recently_added', async () => {
  try {
    const response = await axios(`${url}items/recently_added`);
    return response.data;
  } catch (error) {
    NotificationManager.error('Error loading items', 'Error');
    throw new Error('error');
  }
});

export const fetchCategoryitems = createAsyncThunk('categories/id', async (categoryId) => {
  try {
    const response = await axios(`${url}categories/${categoryId}`);
    return response.data;
  } catch (error) {
    NotificationManager.error('Error loading items', 'Error');
    throw new Error('error');
  }
});

export const fetchItem = createAsyncThunk('items/id', async (itemId) => {
  try {
    const response = await axios(`${url}items/${itemId}`);
    return response.data;
  } catch (error) {
    NotificationManager.error('Error loading item', 'Error');
    throw new Error('error');
  }
});

const initialState = {
  itemsLoading: true,
  itemsArr: [],
  item: null,
  itemLoading: true,
};

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTenItems.fulfilled, (state, action) => {
        state.itemsArr = action.payload;
        state.itemsLoading = false;
      })
      .addCase(fetchCategoryitems.fulfilled, (state, action) => {
        state.itemsArr = action.payload;
        state.itemsLoading = false;
      })
      .addCase(fetchItem.pending, (state) => {
        state.item = null;
        state.itemLoading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.item = action.payload;
        state.itemLoading = false;
      });
  },

});

export default itemSlice.reducer;
