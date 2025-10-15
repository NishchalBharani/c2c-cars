import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import carsSlice from './slices/carsSlice';
import profileSlice from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cars: carsSlice,
    profile: profileSlice,
  },
});

export default store;