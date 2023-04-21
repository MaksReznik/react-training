import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './slices/Products.slice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
