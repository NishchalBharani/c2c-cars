import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put(API_ENDPOINTS.USERS.UPDATE, userData);
    return response.data;
  },

  // Verify user (ID verification, etc.)
  verifyUser: async (verificationData) => {
    const response = await api.post(API_ENDPOINTS.USERS.VERIFICATION, verificationData);
    return response.data;
  },
};

export default userService;