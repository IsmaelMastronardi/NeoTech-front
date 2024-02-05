import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const completeOrder = createAsyncThunk('order/complete', async (order, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}/users/${user.user.id}/orders/fill_and_complete_order`, { order });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchPastOrders = createAsyncThunk('user/fetchPastOrders', async (_, { getState }) => {
  const { user } = getState();
  if (user) {
    try {
      const response = await axios.get(`${url}/users/${user.user.id}/show_past_orders`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  return null;
});

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      itemsCount: state.itemsCount,
      orderItems: state.orderItems,
    });
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

const initialState = {
  loading: true,
  orderItems: loadStateFromLocalStorage()?.orderItems || {},
  itemsCount: loadStateFromLocalStorage()?.itemsCount || 0,
  pastOrdersLoading: true,
  pastOrdersArray: [],
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
    deleteItem: {
      reducer: (state, action) => {
        const item = action.payload;
        state.itemsCount -= state.orderItems[item.name].quantity;
        delete state.orderItems[item.name];
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeOrder.rejected, () => {
        console.log('Error completing order');
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.orderItems = {};
        state.itemsCount = 0;
        state.pastOrdersArray = [action.payload[2]];
        console.log(action.payload);
        saveStateToLocalStorage(state);
      })
      .addCase(fetchPastOrders.pending, (state) => {
        state.pastOrdersLoading = true;
      })
      .addCase(fetchPastOrders.rejected, (state, error) => {
        state.pastOrdersLoading = false;
        console.log(error);
        console.log('Error fetching past orders');
      })
      .addCase(fetchPastOrders.fulfilled, (state, action) => {
        state.pastOrdersLoading = false;
        state.pastOrdersArray = action.payload;
        console.log(action.payload);
      });
  },
});

export const addNewItemAndSave = (item, action = 'default') => (dispatch, getState) => {
  if (action === 'addItem') {
    dispatch(orderSlice.actions.addItem(item));
  } else if (action === 'removeItem') {
    dispatch(orderSlice.actions.removeItem(item));
  } else if (action === 'deleteItem') {
    dispatch(orderSlice.actions.deleteItem(item));
  }

  const updatedState = getState().order;

  saveStateToLocalStorage(updatedState);
};

export const { addNewItem } = orderSlice.actions;
export default orderSlice.reducer;
