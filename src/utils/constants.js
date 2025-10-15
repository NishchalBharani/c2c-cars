// API Configuration
export const API_BASE_URL = 'https://c2c-git-main-jeevacehs-projects.vercel.app/api';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/signup', 
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  CARS: {
    LIST: '/cars',
    CREATE: '/cars',
    DETAIL: '/cars/:id',
    UPDATE: '/cars/:id',
    DELETE: '/cars/:id',
    FEATURED: '/cars/featured',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    VERIFICATION: '/users/verification',
  },
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: 'C2C Cars',
  TAGLINE: 'Peer-to-Peer Vehicle Marketplace',
  SUPPORT_EMAIL: 'support@c2ccars.com',
};

// export default {
//   API_BASE_URL,
//   API_ENDPOINTS,
//   APP_CONSTANTS,
// };