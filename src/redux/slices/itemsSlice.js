/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/items/recentlyAdded';

export const fetchTopTenItems = createAsyncThunk('items/topTen', async () => {
  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
});

const initialState = {
  loading: true,
  itemsArr: [],
};

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopTenItems.fulfilled, (state, action) => {
      state.itemsArr = action.payload;
      state.loading = false;
      console.log(state.itemsArr);
    });
  },

});

export default itemSlice.reducer;
