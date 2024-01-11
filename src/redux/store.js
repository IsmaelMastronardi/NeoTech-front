import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    user: userReducer,
  },
});

export default store;
