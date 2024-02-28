/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import orderReducer, {
  completeOrder,
  fetchPastOrders,
  addItemToOrder,
  deleteItemFromOrder,
  deleteAllOneItemFromOrder,
  fetchOrder,
  addAndRemoveItems,
} from '../orderSlice';
import userReducer from '../userSlice';

jest.mock('axios');
jest.mock('react-notifications', () => ({
  NotificationManager: {
    error: jest.fn(),
  },
}));

describe('orderSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
        order: orderReducer,
      },
      preloadedState: {
        user: {
          user: {
            id: 1,
          },
        },
      },
    });
  });
  it('should handle completeOrder', async () => {
    const responseData = [
      {
        user_id: 1, total_price: 1000, completed: true, id: 1,
      },
    ];
    axios.post.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(completeOrder());

    const state = store.getState().order;
    expect(state.orderItems).toEqual({});
    expect(state.itemsCount).toBe(0);
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });
  it('should handle fetchOrder', async () => {
    const responseData = {
      user_id: 98,
      id: 1,
      total_price: 459.82,
      created_at: '2024-02-25T03:51:45.188Z',
      updated_at: '2024-02-25T04:33:59.983Z',
      order_items: [
        {
          created_at: '2024-02-25T04:33:59.954Z',
          id: 158,
          item: {
            id: 31,
            name: 'Fantastic Wooden Pants',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...',
            price: 459.82,
            image: 'https://i.ibb.co/FWN1SZg/pc2.png',
          },
          item_id: 31,
          order_id: 121,
          quantity: 1,
          updated_at: '2024-02-25T04:33:59.954Z',
        },
      ],
    };
    axios.get.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchOrder());
    const state = store.getState().order;

    expect(state.orderLoading).toBeFalsy();
    expect(state.orderItems).toEqual({
      31: {
        quantity: 1,
        product: {
          id: 31,
          name: 'Fantastic Wooden Pants',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...',
          price: 459.82,
          image: 'https://i.ibb.co/FWN1SZg/pc2.png',
        },
      },
    });
    expect(state.itemsCount).toBe(1);
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle fetchPastOrders', async () => {
    const responseData = [
      {
        id: 1, total_price: 10, user_id: 1, created_at: '2021-01-01T00:00:00.000Z',
      },
      {
        id: 2, total_price: 20, user_id: 1, created_at: '2021-01-02T00:00:00.000Z',
      },
      {
        id: 3, total_price: 30, user_id: 1, created_at: '2021-01-03T00:00:00.000Z',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchPastOrders());

    const state = store.getState().order;
    expect(state.pastOrdersLoading).toBeFalsy();
    expect(state.pastOrdersArray).toEqual(responseData);
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle addItemToOrder', async () => {
    const item = { id: 1, name: 'Test Item', price: 10 };
    const responseData = { item_id: 1, quantity: 1, order_id: 1 };
    axios.post.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(addItemToOrder(item));

    const state = store.getState().order;
    expect(state.orderLoading).toBeFalsy();
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle deleteItemFromOrder', async () => {
    const item = { id: 1, name: 'Test Item', price: 10 };
    const responseData = { item_id: 1, quantity: 1, order_id: 1 };
    axios.post.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(deleteItemFromOrder(item));

    const state = store.getState().order;
    expect(state.orderLoading).toBeFalsy();
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle deleteAllOneItemFromOrder', async () => {
    const item = { id: 1, name: 'Test Item', price: 10 };
    const responseData = { item_id: 1, quantity: 1, order_id: 1 };
    axios.post.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(deleteAllOneItemFromOrder(item));

    const state = store.getState().order;
    expect(state.orderLoading).toBeFalsy();
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle addAndRemoveItems', () => {
    const item = { id: 1, name: 'Test Item', price: 10 };

    // Dispatch addItem action
    store.dispatch(addAndRemoveItems(item, 'addItem'));

    let state = store.getState().order;
    expect(state.orderItems[item.id].quantity).toBe(1);
    expect(state.itemsCount).toBe(1);
    expect(state.totalPrice).toBe(10);

    // Add same item again

    store.dispatch(addAndRemoveItems(item, 'addItem'));

    state = store.getState().order;
    expect(state.orderItems[item.id].quantity).toBe(2);
    expect(state.itemsCount).toBe(2);
    expect(state.totalPrice).toBe(20);

    // Dispatch removeItem action
    store.dispatch(addAndRemoveItems(item, 'removeItem'));

    state = store.getState().order;
    expect(state.orderItems[item.id].quantity).toBe(1);
    expect(state.itemsCount).toBe(1);
    expect(state.totalPrice).toBe(10);

    // Remove same item again, resultin in 0 items left

    store.dispatch(addAndRemoveItems(item, 'removeItem'));

    state = store.getState().order;
    expect(state.itemsCount).toBe(0);
    expect(state.totalPrice).toBe(0);

    // Add same item again

    store.dispatch(addAndRemoveItems(item, 'addItem'));

    state = store.getState().order;
    expect(state.orderItems[item.id].quantity).toBe(1);
    expect(state.itemsCount).toBe(1);
    expect(state.totalPrice).toBe(10);

    // Dispatch deleteItem action

    store.dispatch(addAndRemoveItems(item, 'deleteItem'));

    state = store.getState().order;
    expect(state.itemsCount).toBe(0);
    expect(state.totalPrice).toBe(0);
  });
});
