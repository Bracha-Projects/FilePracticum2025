import axios from "axios"
import { store } from "@/redux/store"

const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const { dispatch } = store
      dispatch({ type: "user/logout" })
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
