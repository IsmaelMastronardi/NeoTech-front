/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const url = 'http://localhost:3000/api/v1/';

export const fetchUser = createAsyncThunk('user/show', async () => {
  try {
    const response = await axios(`${url}users/64`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const createGuestUser = createAsyncThunk('user/create', async () => {
  try {
    const response = await axios.post(`${url}users/create_temporary_user`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  loading: true,
  userFetched: false,
  user: undefined,
  cart: undefined,
  orderItems: [],
  itemCounts: [],
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewItem: {
      reducer: (state, action) => {
        const item = action.payload;
        const id = item.id;
        state.orderItems.push(item);
        state.itemCounts[id] = (state.itemCounts[id] || 0) + 1;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.cart = action.payload[1];
        state.userFetched = true;
      })
      .addCase(createGuestUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.cart = action.payload[1];
        state.userFetched = true;
      });
  },
});

export const { addNewItem } = userSlice.actions;
export default userSlice.reducer;
