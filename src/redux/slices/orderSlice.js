import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const url = 'http://localhost:3000/api/v1/';

export const completeOrder = createAsyncThunk('order/complete', async (order, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}/users/${user.user.id}/orders/complete_order`, { order });
    return response.data;
  } catch (error) {
    NotificationManager.error('Error completing order', 'Error');
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
      NotificationManager.error('Error loading your past orders', 'Error');
      throw new Error(error);
    }
  }
  return null;
});

export const addItemToOrder = createAsyncThunk('order/addItemToOrder', async (item, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}users/${user.user.id}/orders/add_item`, { order_item: { item_id: item.id } });
    return response.data;
  } catch (error) {
    NotificationManager.error('Error adding item', 'Error');
    throw new Error(error);
  }
});

export const deleteItemFromOrder = createAsyncThunk('order/deleteItemFromOrder', async (item, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}users/${user.user.id}/orders/remove_one_item`, { order_item: { item_id: item.id } });
    return response.data;
  } catch (error) {
    NotificationManager.error('Error deleting item', 'Error');
    throw new Error(error);
  }
});

export const deleteAllOneItemFromOrder = createAsyncThunk('order/deleteAllOneItemFromOrder', async (item, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}users/${user.user.id}/orders/remove_item`, { order_item: { item_id: item.id } });
    return response.data;
  } catch (error) {
    NotificationManager.error('Error deleting item', 'Error');
    throw new Error(error);
  }
});

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (_, { getState }) => {
  const { user } = getState();
  if (!user.loadig) {
    try {
      const response = await axios.get(`${url}users/${user.user.id}/orders/show_current_order`);
      return response.data;
    } catch (error) {
      NotificationManager.error('Error loading your order', 'Error');
      throw new Error(error);
    }
  }
  throw new Error('User not loaded');
});

const initialState = {
  orderLoading: true,
  orderItems: {},
  itemsCount: 0,
  pastOrdersLoading: true,
  pastOrdersArray: [],
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action) => {
        const item = action.payload;
        if (!state.orderItems[item.id]) {
          state.orderItems[item.id] = { quantity: 1, product: item };
        } else {
          state.orderItems[item.id].quantity += 1;
        }
        state.itemsCount += 1;
        state.totalPrice += item.price;
      },
    },
    removeItem: {
      reducer: (state, action) => {
        const { item } = action.payload;
        if (state.orderItems[item.id].quantity === 1) {
          delete state.orderItems[item.id];
        } else {
          state.orderItems[item.id].quantity -= 1;
        }
        state.itemsCount -= 1;
        state.totalPrice -= item.price;
      },
    },
    deleteItem: {
      reducer: (state, action) => {
        const item = action.payload;
        state.itemsCount -= state.orderItems[item.id].quantity;
        state.totalPrice -= item.price * state.orderItems[item.id].quantity;
        delete state.orderItems[item.id];
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.orderItems = {};
        state.itemsCount = 0;
        state.pastOrdersArray = [action.payload[2]];
        state.pastOrdersLoading = true;
      })
      .addCase(fetchPastOrders.pending, (state) => {
        state.pastOrdersLoading = true;
      })
      .addCase(fetchPastOrders.rejected, (state) => {
        state.pastOrdersLoading = false;
      })
      .addCase(fetchPastOrders.fulfilled, (state, action) => {
        state.pastOrdersLoading = false;
        state.pastOrdersArray = action.payload;
      })
      .addCase(addItemToOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(addItemToOrder.rejected, (state) => {
        state.orderLoading = false;
      })
      .addCase(addItemToOrder.fulfilled, (state) => {
        state.orderLoading = false;
      })
      .addCase(deleteItemFromOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(deleteItemFromOrder.rejected, (state) => {
        state.orderLoading = false;
      })
      .addCase(deleteItemFromOrder.fulfilled, (state) => {
        state.orderLoading = false;
      })
      .addCase(deleteAllOneItemFromOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(deleteAllOneItemFromOrder.rejected, (state) => {
        state.orderLoading = false;
      })
      .addCase(deleteAllOneItemFromOrder.fulfilled, (state) => {
        state.orderLoading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderLoading = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.itemsCount = 0;
        action.payload.order_items.forEach((orderItem) => {
          state.orderItems[orderItem.item_id] = {
            quantity: orderItem.quantity, product: orderItem.item,
          };
          state.itemsCount += orderItem.quantity;
        });
        state.totalPrice = action.payload.total_price;
      });
  },
});

export const addAndRemoveItems = (item, action = 'default') => (dispatch) => {
  if (action === 'addItem') {
    dispatch(orderSlice.actions.addItem(item));
  } else if (action === 'removeItem') {
    dispatch(orderSlice.actions.removeItem({ item }));
  } else if (action === 'deleteItem') {
    dispatch(orderSlice.actions.deleteItem(item));
  }
};

export const { addNewItem } = orderSlice.actions;
export default orderSlice.reducer;
