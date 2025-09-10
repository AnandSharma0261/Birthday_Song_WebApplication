// API Configuration for Replit deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? '' // Same domain in production (Replit)
    : 'http://localhost:3001' // Local development
  );

export { API_BASE_URL };
