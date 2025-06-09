import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axiosInstance from "@/utils/axiosInstance"
import type { FileItem } from "@/types/FileItem"

interface RecentFilesState {
  files: FileItem[]
  loading: boolean
  error: string | null
  lastUpdated: number | null
}

const initialState: RecentFilesState = {
  files: [],
  loading: false,
  error: null,
  lastUpdated: null,
}

export const fetchRecentFiles = createAsyncThunk<FileItem[], { userId: number; limit?: number }>(
  "recentFiles/fetchRecentFiles",
  async ({ userId, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<FileItem[]>(`/api/user/${userId}/recent-files?limit=${limit}`)
      return response.data
    } catch (error: any) {
      console.error("Error fetching recent files:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch recent files")
    }
  },
)

const recentFilesSlice = createSlice({
  name: "recentFiles",
  initialState,
  reducers: {
    clearRecentFiles: (state) => {
      state.files = []
      state.error = null
      state.lastUpdated = null
    },
    addRecentFile: (state, action: PayloadAction<FileItem>) => {
      // Add file to the beginning and remove duplicates
      state.files = [action.payload, ...state.files.filter((f) => f.id !== action.payload.id)].slice(0, 10)
      state.lastUpdated = Date.now()
    },
    removeRecentFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter((file) => file.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecentFiles.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchRecentFiles.fulfilled, (state, action) => {
      state.loading = false
      state.files = action.payload
      state.lastUpdated = Date.now()
    })
    builder.addCase(fetchRecentFiles.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { clearRecentFiles, addRecentFile, removeRecentFile } = recentFilesSlice.actions

// Selectors
export const selectRecentFiles = (state: RootState) => state.recentFiles.files
export const selectRecentFilesLoading = (state: RootState) => state.recentFiles.loading
export const selectRecentFilesError = (state: RootState) => state.recentFiles.error
export const selectRecentFilesLastUpdated = (state: RootState) => state.recentFiles.lastUpdated

export default recentFilesSlice.reducer
