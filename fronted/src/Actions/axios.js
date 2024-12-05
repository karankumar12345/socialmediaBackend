import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://socialmedia-app-3.onrender.com/', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set token in headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default instance;