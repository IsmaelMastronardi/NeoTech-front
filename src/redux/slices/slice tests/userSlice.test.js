import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import userReducer, { fetchUser, createGuestUser } from '../userSlice';

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
    const responseData = [{ id: 1, name: 'Guest' }];
    axios.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchUser({ id: 1 }));

    const state = store.getState().user;
    expect(state.loading).toBeFalsy();
    expect(state.userFetched).toBeTruthy();
    expect(state.user).toEqual(responseData);

    expect(NotificationManager.error).not.toHaveBeenCalled();
  });

  it('should handle createGuestUser', async () => {
    const responseData = { id: 2, name: 'Guest User' };
    axios.post.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(createGuestUser());

    const state = store.getState().user;
    expect(state.loading).toBeFalsy();
    expect(state.userFetched).toBeTruthy();
    expect(state.user).toEqual(responseData);

    expect(NotificationManager.error).not.toHaveBeenCalled();
  });
});
