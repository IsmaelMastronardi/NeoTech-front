import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
  },
});

export default store;
