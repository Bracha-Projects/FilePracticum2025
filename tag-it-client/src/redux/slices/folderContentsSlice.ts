import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import axiosInstance from "@/utils/axiosInstance"
import type { FileItem } from "@/types/FileItem"
import type { FolderItem } from "@/types/FolderItem"

interface FolderPath {
  id: number
  name: string
}

interface FolderContentsState {
  currentFolderId: number | null
  subFolders: FolderItem[]
  files: FileItem[]
  folderPath: FolderPath[]
  loading: boolean
  error: string | null
}

const initialState: FolderContentsState = {
  currentFolderId: null,
  subFolders: [],
  files: [],
  folderPath: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchFolderContents = createAsyncThunk<{ subFolders: FolderItem[]; files: FileItem[] }, number>(
  "folderContents/fetchFolderContents",
  async (folderId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Folder/${folderId}/items`)
      return response.data
    } catch (error: any) {
      console.error("Error fetching folder contents:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch folder contents")
    }
  },
)

export const createFolder = createAsyncThunk<FolderItem, { name: string; parentFolderId: number; ownerId: number }>(
  "folderContents/createFolder",
  async (folderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/Folder/create-folder", folderData)
      return response.data
    } catch (error: any) {
      console.error("Error creating folder:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to create folder")
    }
  },
)

export const deleteFile = createAsyncThunk<number, number>(
  "folderContents/deleteFile",
  async (fileId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`api/File/delete-file/${fileId}`)
      return fileId
    } catch (error: any) {
      console.error("Error deleting file:", error)
      return rejectWithValue(error.response?.data || error.message || "Failed to delete file")
    }
  },
)

const folderContentsSlice = createSlice({
  name: "folderContents",
  initialState,
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<number>) => {
      state.currentFolderId = action.payload
    },
    addToFolderPath: (state, action: PayloadAction<FolderPath>) => {
      state.folderPath.push(action.payload)
    },
    goToParentFolder: (state) => {
      if (state.folderPath.length > 1) {
        state.folderPath.pop()
        const parentFolder = state.folderPath[state.folderPath.length - 1]
        state.currentFolderId = parentFolder.id
      }
    },
    resetFolderPath: (state, action: PayloadAction<FolderPath>) => {
      state.folderPath = [action.payload]
      state.currentFolderId = action.payload.id
    },
    navigateToFolder: (state, action: PayloadAction<FolderPath>) => {
      state.folderPath.push(action.payload)
      state.currentFolderId = action.payload.id
    },
  },
  extraReducers: (builder) => {
    // Fetch folder contents
    builder.addCase(fetchFolderContents.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchFolderContents.fulfilled, (state, action) => {
      state.loading = false
      console.log("Folders from server in slice:", action.payload)  
      state.subFolders = action.payload.subFolders
      state.files = action.payload.files
    })
    builder.addCase(fetchFolderContents.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Create folder
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.subFolders.push(action.payload)
    })

    // Delete file
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload)
    })
  },
})

export const { setCurrentFolder, addToFolderPath, goToParentFolder, resetFolderPath, navigateToFolder } =
  folderContentsSlice.actions

// Selectors
export const selectCurrentFolderId = (state: RootState) => state.folderContents.currentFolderId
export const selectSubFolders = (state: RootState) => state.folderContents.subFolders
export const selectFiles = (state: RootState) => state.folderContents.files
export const selectFolderPath = (state: RootState) => state.folderContents.folderPath
export const selectFolderContentsLoading = (state: RootState) => state.folderContents.loading
export const selectFolderContentsError = (state: RootState) => state.folderContents.error

export default folderContentsSlice.reducer
