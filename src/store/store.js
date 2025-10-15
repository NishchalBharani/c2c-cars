import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import carsSlice from './slices/carsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cars: carsSlice,
  },
});

export default store;