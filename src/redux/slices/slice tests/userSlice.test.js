/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import userReducer, { fetchUser, createGuestUser } from '../userSlice';

// Mocking axios and react-notifications
jest.mock('axios');
jest.mock('react-notifications', () => ({
  NotificationManager: {
    error: jest.fn(),
  },
}));

describe('userSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  it('should handle fetchUser', async () => {
    // Mock axios response
    const responseData = [{ id: 1, name: 'Guest' }];
    axios.mockResolvedValueOnce({ data: responseData });

    // Dispatch the fetchUser action
    await store.dispatch(fetchUser({ id: 1 }));

    // Check the state after the action is fulfilled
    const state = store.getState().user;
    expect(state.loading).toBeFalsy();
    expect(state.userFetched).toBeTruthy();
    expect(state.user).toEqual(responseData);

    // Check if NotificationManager.error is not called
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle createGuestUser', async () => {
    // Mock axios response
    const responseData = { id: 2, name: 'Guest User' };
    axios.post.mockResolvedValueOnce({ data: responseData });

    // Dispatch the createGuestUser action
    await store.dispatch(createGuestUser());

    // Check the state after the action is fulfilled
    const state = store.getState().user;
    expect(state.loading).toBeFalsy();
    expect(state.userFetched).toBeTruthy();
    expect(state.user).toEqual(responseData);

    // Check if NotificationManager.error is not called
    expect(NotificationManager.error).not.toHaveBeenCalled();
  });
});
