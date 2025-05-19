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

const API_BASE_URL = "/api/files"

// Async thunks for API calls
export const fetchUserFiles = createAsyncThunk<FileItem[]>("files/fetchUserFiles", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<FileItem[]>(`${API_BASE_URL}/user-files`)
    console.log("API Response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error fetching files:", error)
    return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
  }
})

export const deleteFile = createAsyncThunk<number, number>(
  "files/deleteFile",
  async (fileId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_BASE_URL}/files/${fileId}`)
      return fileId
    } catch (error: any) {
      console.error("Error deleting file:", error)
      return rejectWithValue(error.response?.data || error.message || "An unknown error occurred")
    }
  },
)

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

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
    // fetchUserFiles
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

    // deleteFile
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

export const { setCurrentFolder, toggleFileSelection, clearFileSelections } = fileSlice.actions

export const selectFiles = (state: RootState) => state.files.files
export const selectFileById = (state: RootState, fileId: number) => state.files.files.find((file) => file.id === fileId)
export const selectFilesLoading = (state: RootState) => state.files.loading
export const selectFilesError = (state: RootState) => state.files.error
export const selectCurrentFolder = (state: RootState) => state.files.currentFolder
export const selectSelectedFiles = (state: RootState) => state.files.selectedFiles

export default fileSlice.reducer
