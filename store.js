import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice';
import searchReducer from './searchSilce';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search:searchReducer,
    order:orderReducer
  },
});