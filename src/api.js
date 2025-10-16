// src/api.js
// Centralized axios instance for API calls
// Reads REACT_APP_API_URL from environment variables
import axios from 'axios';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true
});
export default api;
