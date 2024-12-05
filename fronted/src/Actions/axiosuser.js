

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://socialmedia-app-3.onrender.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;


