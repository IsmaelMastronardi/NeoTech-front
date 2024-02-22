import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/';

export const completeOrder = createAsyncThunk('order/complete', async (order, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}/users/${user.user.id}/orders/complete_order`, { order });
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

export const addItemToOrder = createAsyncThunk('order/addItemToOrder', async (item, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}users/${user.user.id}/orders/add_item`, { order_item: { item_id: item.id } });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteItemFromOrder = createAsyncThunk('order/deleteItemFromOrder', async (item, { getState }) => {
  const { user } = getState();
  try {
    const response = await axios.post(`${url}users/${user.user.id}/orders/remove_item`, { order_item: { item_id: item.id } });
    return response.data;
  } catch (error) {
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
          state.orderItems[item.id] = { quantity: 1 };
        } else {
          state.orderItems[item.id].quantity += 1;
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
        state.pastOrdersLoading = true;
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
      })
      .addCase(addItemToOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(addItemToOrder.rejected, (state, error) => {
        state.orderLoading = false;
        console.log(error);
        console.log('Error adding to cart');
      })
      .addCase(addItemToOrder.fulfilled, (state) => {
        state.orderLoading = false;
        console.log('Item added to order');
      })
      .addCase(deleteItemFromOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(deleteItemFromOrder.rejected, (state, error) => {
        state.orderLoading = false;
        console.log(error);
        console.log('Error deleting from cart');
      })
      .addCase(deleteItemFromOrder.fulfilled, (state) => {
        state.orderLoading = false;
        console.log('Item deleted from cart');
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(fetchOrder.rejected, (state, error) => {
        state.orderLoading = false;
        console.log(error);
        console.log('Error fetching order');
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

export const addNewItemAndSave = (item, action = 'default') => (dispatch) => {
  console.log('addNewItemAndSave');
  if (action === 'addItem') {
    console.log('addNewItemAndSave addItem');
    // dispatch(orderSlice.actions.addItem(item));
    fetchOrder();
  } else if (action === 'removeItem') {
    dispatch(orderSlice.actions.removeItem(item));
  } else if (action === 'deleteItem') {
    dispatch(orderSlice.actions.deleteItem(item));
  }
};

export const { addNewItem } = orderSlice.actions;
export default orderSlice.reducer;
