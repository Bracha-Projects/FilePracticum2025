import axios from "axios"
import { store } from "@/redux/store"

const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token from Redux
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear user data from Redux and redirect to login
      const { dispatch } = store
      dispatch({ type: "user/logout" })
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
