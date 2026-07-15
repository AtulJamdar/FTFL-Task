import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ftfl-task.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;