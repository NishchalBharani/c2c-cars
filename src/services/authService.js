import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
  // Login user
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  // Register user (signup)
  register: async (fullName, email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
    return response.data;
  },
};

export default authService;