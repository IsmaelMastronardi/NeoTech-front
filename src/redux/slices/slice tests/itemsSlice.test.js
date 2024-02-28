import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import itemReducer, {
  fetchTopTenItems,
  fetchItem,
  fetchCategoryItems,
} from '../itemsSlice';

jest.mock('axios');

describe('itemSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        items: itemReducer,
      },
    });
  });

  it('should handle fetchTopTenItems', async () => {
    const responseData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' },
      { id: 6, name: 'Item 6' },
      { id: 7, name: 'Item 7' },
      { id: 8, name: 'Item 8' },
      { id: 9, name: 'Item 9' },
      { id: 10, name: 'Item 10' },
    ];
    axios.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchTopTenItems());

    const state = store.getState().items;
    expect(state.itemsLoading).toBeFalsy();
    expect(state.itemsArr).toEqual(responseData);
  });

  it('should handle fetchCategoryitems', async () => {
    const categoryId = 123;
    const responseData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    axios.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchCategoryItems(categoryId));

    const state = store.getState().items;
    expect(state.itemsLoading).toBeFalsy();
    expect(state.itemsArr).toEqual(responseData);
  });

  it('should handle fetchItem', async () => {
    const itemId = 456;
    const responseData = { id: 456, name: 'Single Item' };
    axios.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(fetchItem(itemId));

    const state = store.getState().items;
    expect(state.itemLoading).toBeFalsy();
    expect(state.item).toEqual(responseData);
  });
});
