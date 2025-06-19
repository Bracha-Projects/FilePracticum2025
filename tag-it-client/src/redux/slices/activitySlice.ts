import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axiosInstance from "@/utils/axiosInstance"

export interface ActivityItem {
  id: number
  action: string
  fileName?: string
  folderName?: string
  timestamp: string
  details?: string
}

interface ActivityState {
  activities: ActivityItem[]
  loading: boolean
  error: string | null
  lastUpdated: number | null
}

const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
  lastUpdated: null,
}

export const fetchUserActivity = createAsyncThunk<ActivityItem[], { userId: number; limit?: number }>(
  "activity/fetchUserActivity",
  async ({ userId, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ActivityItem[]>(`/api/User/${userId}/recent-activity?limit=${limit}`)
      return response.data
    } catch (error: any) {
      console.error("Error fetching user activity:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch user activity")
    }
  },
)

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    clearActivity: (state) => {
      state.activities = []
      state.error = null
      state.lastUpdated = null
    },
    addActivity: (state, action: PayloadAction<ActivityItem>) => {
      state.activities = [action.payload, ...state.activities].slice(0, 20)
      state.lastUpdated = Date.now()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserActivity.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserActivity.fulfilled, (state, action) => {
      state.loading = false
      state.activities = action.payload
      state.lastUpdated = Date.now()
    })
    builder.addCase(fetchUserActivity.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { clearActivity, addActivity } = activitySlice.actions

export const selectUserActivity = (state: RootState) => state.activity.activities
export const selectActivityLoading = (state: RootState) => state.activity.loading
export const selectActivityError = (state: RootState) => state.activity.error
export const selectActivityLastUpdated = (state: RootState) => state.activity.lastUpdated

export default activitySlice.reducer
