import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { User } from "@/types/User"
import axiosInstance from "@/utils/axiosInstance"



interface UserState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
}

// Login async thunk
export const loginUser = createAsyncThunk<{ user: User; token: string }, { email: string; password: string }>(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/User/login",
        credentials,
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  },
)

// Register async thunk
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string; firstName: string; lastName: string }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      "api/User/register",
      userData,
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token)
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token)
      }
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token)
      }
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { logout, clearError, setUser } = userSlice.actions

// Selectors
export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token
export const selectUserLoading = (state: RootState) => state.user.loading
export const selectUserError = (state: RootState) => state.user.error

export default userSlice.reducer
