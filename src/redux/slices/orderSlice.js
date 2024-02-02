import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const completeOrder = createAsyncThunk('order/complete', async (order) => {
  try {
    const response = await axios.post(`${url}orders`, order);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('orderState', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('orderState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading order state from local storage:', error);
    return undefined;
  }
};

const initialState = loadStateFromLocalStorage() || {
  loading: true,
  cart: null,
  orderItems: {},
  itemsCount: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action) => {
        const item = action.payload;
        if (!state.orderItems[item.name]) {
          state.orderItems[item.name] = { item, quantity: 1 };
        } else {
          state.orderItems[item.name].quantity += 1;
        }
        state.itemsCount += 1;
      },
    },
    removeItem: {
      reducer: (state, action) => {
        const item = action.payload;
        if (state.orderItems[item.name].quantity === 1) {
          delete state.orderItems[item.name];
        } else {
          state.orderItems[item.name].quantity -= 1;
        }
        state.itemsCount -= 1;
      },
    },
  },
});

export const addNewItemAndSave = (item, action = 'default') => (dispatch, getState) => {
  if (action === 'addItem') {
    dispatch(orderSlice.actions.addItem(item));
  } else if (action === 'removeItem') {
    dispatch(orderSlice.actions.removeItem(item));
  }

  const updatedState = getState().order;

  saveStateToLocalStorage(updatedState);
};

export const { addNewItem } = orderSlice.actions;
export default orderSlice.reducer;
