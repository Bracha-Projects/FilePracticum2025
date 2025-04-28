import axios from "axios"

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:7153/api", // Set your base API URL
})

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // Retrieve token from localStorage
    if (token) {
      config.headers = config.headers || {}; // Ensure headers is defined
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance