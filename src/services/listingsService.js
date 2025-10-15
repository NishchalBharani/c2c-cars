import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const listingsService = {
  // Create a new listing
  createListing: async (listingData) => {
    console.log('Sending listing data:', listingData);
    const response = await api.post(API_ENDPOINTS.LISTINGS.CREATE, listingData);
    console.log('Listing response:', response.data);
    return response.data;
  },

  // Get all listings
  getListings: async (filters = {}) => {
    console.log('Fetching listings with filters:', filters);
    const response = await api.get(API_ENDPOINTS.LISTINGS.LIST, { params: filters });
    console.log('Listings response:', response.data);
    return response.data;
  },

  // Get listing by ID
  getListingById: async (id) => {
    console.log('Fetching listing by ID:', id);
    const response = await api.get(API_ENDPOINTS.LISTINGS.DETAIL.replace(':id', id));
    console.log('Listing detail response:', response.data);
    return response.data;
  },

  // Get user's listings
  getMyListings: async () => {
    const response = await api.get(API_ENDPOINTS.LISTINGS.MY_LISTINGS);
    return response.data;
  },

  // Update listing
  updateListing: async (id, listingData) => {
    const response = await api.put(API_ENDPOINTS.LISTINGS.UPDATE.replace(':id', id), listingData);
    return response.data;
  },

  // Delete listing
  deleteListing: async (id) => {
    const response = await api.delete(API_ENDPOINTS.LISTINGS.DELETE.replace(':id', id));
    return response.data;
  },
};

export default listingsService;