import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': "application/x-www-form-urlencoded",
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data || "Something went wrong!")
);

export default axiosInstance;