import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listingsService from '../../services/listingsService';

// Async thunk for creating listing
export const createListing = createAsyncThunk(
  'listings/createListing',
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await listingsService.createListing(listingData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create listing'
      );
    }
  }
);

// Async thunk for fetching all listings
export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await listingsService.getListings(filters);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch listings'
      );
    }
  }
);

// Async thunk for fetching listing by ID
export const fetchListingById = createAsyncThunk(
  'listings/fetchListingById',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await listingsService.getListingById(listingId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch listing'
      );
    }
  }
);

// Async thunk for fetching user's listings
export const fetchMyListings = createAsyncThunk(
  'listings/fetchMyListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listingsService.getMyListings();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch listings'
      );
    }
  }
);

const initialState = {
  listings: [], // All listings
  myListings: [], // User's listings
  currentListing: null, // Single listing detail
  loading: false,
  error: null,
  success: false,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
    setCurrentListing: (state, action) => {
      state.currentListing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create listing cases
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myListings.unshift(action.payload.listing);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch all listings cases
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload; // This should be the array directly
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch listing by ID cases
      .addCase(fetchListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentListing = action.payload.listing || action.payload;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my listings cases
      .addCase(fetchMyListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.myListings = action.payload.listings || [];
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearCurrentListing, 
  setCurrentListing 
} = listingsSlice.actions;
export default listingsSlice.reducer;