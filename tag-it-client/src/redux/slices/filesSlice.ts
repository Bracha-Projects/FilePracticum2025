import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axiosInstance from "@/utils/axiosInstance"
import { FileItem } from "@/types/FileItem"

interface FilesState {
  files: FileItem[]
  loading: boolean
  error: string | null
  currentFolder: number | null
  selectedFiles: number[]
}

const initialState: FilesState = {
  files: [],
  loading: false,
  error: null,
  currentFolder: null,
  selectedFiles: [],
}

// API base URL - should be configured from environment variables in a real app
// This should match your actual API endpoint
const API_BASE_URL = "/api"

// Async thunks for API calls
export const fetchUserFiles = createAsyncThunk<FileItem[]>("files/fetchUserFiles", async (_, { rejectWithValue }) => {
  try {
    // Update this endpoint to match your actual API endpoint
    const response = await axiosInstance.get<FileItem[]>(`${API_BASE_URL}/files`)
    console.log("API Response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error fetching files:", error)
    return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
  }
})

export const getFileDownloadUrl = createAsyncThunk<{ fileId: number; url: string }, number>(
  "files/getFileDownloadUrl",
  async (fileId: number, { rejectWithValue }) => {
    try {
      // Update this endpoint to match your actual API endpoint
      const response = await axiosInstance.get<{ url: string }>(`${API_BASE_URL}/files/${fileId}/download`)
      return { fileId, url: response.data.url }
    } catch (error: any) {
      console.error("Error getting download URL:", error)
      return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
    }
  },
)

export const getFileViewUrl = createAsyncThunk<{ fileId: number; url: string }, number>(
  "files/getFileViewUrl",
  async (fileId: number, { rejectWithValue }) => {
    try {
      // Update this endpoint to match your actual API endpoint
      const response = await axiosInstance.get<{ url: string }>(`${API_BASE_URL}/files/${fileId}/view`)
      return { fileId, url: response.data.url }
    } catch (error: any) {
      console.error("Error getting view URL:", error)
      return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
    }
  },
)

export const deleteFile = createAsyncThunk<number, number>(
  "files/deleteFile",
  async (fileId: number, { rejectWithValue }) => {
    try {
      // Update this endpoint to match your actual API endpoint
      await axiosInstance.delete(`${API_BASE_URL}/files/${fileId}`)
      return fileId
    } catch (error: any) {
      console.error("Error deleting file:", error)
      return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
    }
  },
)

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Create the file slice
const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<number | null>) => {
      state.currentFolder = action.payload
    },
    toggleFileSelection: (state, action: PayloadAction<number>) => {
      const fileId = action.payload
      if (state.selectedFiles.includes(fileId)) {
        state.selectedFiles = state.selectedFiles.filter((id) => id !== fileId)
      } else {
        state.selectedFiles.push(fileId)
      }
    },
    clearFileSelections: (state) => {
      state.selectedFiles = []
    },
  },
  extraReducers: (builder) => {
    // Handle fetchUserFiles
    builder.addCase(fetchUserFiles.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserFiles.fulfilled, (state, action: PayloadAction<FileItem[]>) => {
      state.loading = false
      state.files = action.payload
    })
    builder.addCase(fetchUserFiles.rejected, (state, action) => {
      state.loading = false
      state.error = (action.payload as string) || "Failed to fetch files"
    })

    // Handle getFileDownloadUrl
    builder.addCase(getFileDownloadUrl.fulfilled, (state, action: PayloadAction<{ fileId: number; url: string }>) => {
      const { fileId, url } = action.payload
      const fileIndex = state.files.findIndex((file) => file.id === fileId)
      if (fileIndex !== -1) {
        state.files[fileIndex].downloadUrl = url
      }
    })

    // Handle getFileViewUrl
    builder.addCase(getFileViewUrl.fulfilled, (state, action: PayloadAction<{ fileId: number; url: string }>) => {
      const { fileId, url } = action.payload
      const fileIndex = state.files.findIndex((file) => file.id === fileId)
      if (fileIndex !== -1) {
        state.files[fileIndex].viewUrl = url
      }
    })

    // Handle deleteFile
    builder.addCase(deleteFile.pending, (state, action) => {
      const fileId = action.meta.arg
      const fileIndex = state.files.findIndex((file) => file.id === fileId)
      if (fileIndex !== -1) {
        state.files[fileIndex].isDeleting = true
      }
    })
    builder.addCase(deleteFile.fulfilled, (state, action: PayloadAction<number>) => {
      const fileId = action.payload
      state.files = state.files.filter((file) => file.id !== fileId)
      state.selectedFiles = state.selectedFiles.filter((id) => id !== fileId)
    })
    builder.addCase(deleteFile.rejected, (state, action) => {
      const fileId = action.meta.arg
      const fileIndex = state.files.findIndex((file) => file.id === fileId)
      if (fileIndex !== -1) {
        state.files[fileIndex].isDeleting = false
      }
      state.error = (action.payload as string) || "Failed to delete file"
    })
  },
})

// Export actions and reducer
export const { setCurrentFolder, toggleFileSelection, clearFileSelections } = fileSlice.actions

// Export selectors
export const selectFiles = (state: RootState) => state.files.files
export const selectFileById = (state: RootState, fileId: number) => state.files.files.find((file) => file.id === fileId)
export const selectFilesLoading = (state: RootState) => state.files.loading
export const selectFilesError = (state: RootState) => state.files.error
export const selectCurrentFolder = (state: RootState) => state.files.currentFolder
export const selectSelectedFiles = (state: RootState) => state.files.selectedFiles

export default fileSlice.reducer
