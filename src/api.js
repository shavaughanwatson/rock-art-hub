// src/api.js
import axios from 'axios';
import { API_KEY } from './util';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Your Strapi API base URL
  headers: {
    Authorization: `Bearer ${API_KEY}`, // Replace with your actual API token
  },
});

export default api;
