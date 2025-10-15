import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  featuredCars: [],
  loading: false,
  filters: {
    make: '',
    model: '',
    priceRange: [0, 1000000],
    city: '',
  },
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    setFeaturedCars: (state, action) => {
      state.featuredCars = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setCars, setFeaturedCars, setLoading, setFilters } = carsSlice.actions;
export default carsSlice.reducer;