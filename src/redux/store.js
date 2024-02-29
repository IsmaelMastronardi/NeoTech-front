import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import categoriesReducer from './slices/categoriesSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer,
    order: orderReducer,
    categories: categoriesReducer,
  },
});

export default store;
