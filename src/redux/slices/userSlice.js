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

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const loadStateFromLocalStorage = () => {
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

const initialState = loadStateFromLocalStorage() || {
  loading: true,
  userFetched: false,
  user: null,
  cart: null,
  orderItems: {},
  itemsCount: 0,
};

const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewItem: {
      reducer: (state, action) => {
        const item = action.payload;
        const id = item.id;
        state.orderItems[item.name] = (state.orderItems[item.name] ?? 0) + 1;
        state.itemsCount += 1;
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

export const addNewItemAndSave = (item) => (dispatch, getState) => {
  dispatch(userSlice.actions.addNewItem(item));

  const updatedState = getState().user;

  saveStateToLocalStorage(updatedState);
};

export const { addNewItem } = userSlice.actions;
export default userSlice.reducer;
