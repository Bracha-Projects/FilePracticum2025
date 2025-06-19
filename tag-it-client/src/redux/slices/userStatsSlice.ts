import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axiosInstance from "@/utils/axiosInstance"

export interface UserStats {
  totalFiles: number
  totalSizeBytes: number
  totalTags: number
  totalFolders: number
  storageUsedGB: number
  storageLimit: number
}

interface UserStatsState {
  stats: UserStats | null
  loading: boolean
  error: string | null
  lastUpdated: number | null
}

const initialState: UserStatsState = {
  stats: null,
  loading: false,
  error: null,
  lastUpdated: null,
}

export const fetchUserStats = createAsyncThunk<UserStats, number>(
  "userStats/fetchUserStats",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UserStats>(`/api/User/${userId}/stats`)
      return response.data
    } catch (error: any) {
      console.error("Error fetching user stats:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch user stats")
    }
  },
)

const userStatsSlice = createSlice({
  name: "userStats",
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null
      state.error = null
      state.lastUpdated = null
    },
    updateFileCount: (state, action: PayloadAction<number>) => {
      if (state.stats) {
        state.stats.totalFiles += action.payload
      }
    },
    updateFolderCount: (state, action: PayloadAction<number>) => {
      if (state.stats) {
        state.stats.totalFolders += action.payload
      }
    },
    updateStorageUsed: (state, action: PayloadAction<number>) => {
      if (state.stats) {
        state.stats.totalSizeBytes += action.payload
        state.stats.storageUsedGB = state.stats.totalSizeBytes / (1024 * 1024 * 1024)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserStats.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserStats.fulfilled, (state, action) => {
      state.loading = false
      state.stats = action.payload
      state.lastUpdated = Date.now()
    })
    builder.addCase(fetchUserStats.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { clearStats, updateFileCount, updateFolderCount, updateStorageUsed } = userStatsSlice.actions

export const selectUserStats = (state: RootState) => state.userStats.stats
export const selectUserStatsLoading = (state: RootState) => state.userStats.loading
export const selectUserStatsError = (state: RootState) => state.userStats.error
export const selectUserStatsLastUpdated = (state: RootState) => state.userStats.lastUpdated

export default userStatsSlice.reducer
