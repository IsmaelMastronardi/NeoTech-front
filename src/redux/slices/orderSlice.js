/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
        state.orderItems[item.name] = (state.orderItems[item.name] ?? 0) + 1;
        state.itemsCount += 1;
      },
    },
    removeItem: {
      reducer: (state, action) => {
        const item = action.payload;
        if (state.orderItems[item.name] - 1 === 0) {
          delete state.orderItems[item.name];
        } else {
          state.orderItems[item.name] = (state.orderItems[item.name] ?? 0) - 1;
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
