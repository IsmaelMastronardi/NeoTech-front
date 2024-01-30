/* eslint-disable no-unused-expressions */
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
  oldCartItems: [],
  newCartItems: [],
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewItem: {
      reducer: (state, action) => {
        state.newCartItems.push(action.payload);
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.cart = action.payload[1];
        state.oldCartItems = action.payload[2];
        state.userFetched = true;
      })
      .addCase(createGuestUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.cart = action.payload[1];
        state.oldCartItems = action.payload[2];
        state.userFetched = true;
        console.log('Guest user created');
        console.log(action.payload[2]);
      });
  },
});

export const { addNewItem } = userSlice.actions;
export default userSlice.reducer;
