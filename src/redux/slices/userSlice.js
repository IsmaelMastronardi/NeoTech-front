/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const fetchUser = createAsyncThunk('user/show', async (user) => {
  try {
    const response = await axios(`${url}users/${user.id}`);
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

const saveUserToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem('userState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};

const initialState = {
  loading: true,
  userFetched: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.userFetched = true;
      })
      .addCase(createGuestUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
        state.userFetched = true;
        saveUserToLocalStorage(state);
      });
  },
});

export default userSlice.reducer;
