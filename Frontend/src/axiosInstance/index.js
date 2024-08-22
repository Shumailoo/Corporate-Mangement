import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, // Include credentials (cookies) in requests
});

export default axiosInstance;