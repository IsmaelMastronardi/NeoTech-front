import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
