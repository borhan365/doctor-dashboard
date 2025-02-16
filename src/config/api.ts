const API_BASE = '/api'

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    SESSION: `${API_BASE}/auth/session`,
  },
  USERS: {
    BASE: `${API_BASE}/users`,
    PROFILE: `${API_BASE}/users/profile`,
  },
  // Add other API routes as needed
} as const 