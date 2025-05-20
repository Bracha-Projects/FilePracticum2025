import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axiosInstance"
import { FolderItem } from "@/types/FolderItem"

interface FoldersState {
  folders: FolderItem[]
  loading: boolean
  error: string | null
  currentFolder: number | null
}

const initialState: FoldersState = {
  folders: [],
  loading: false,
  error: null,
  currentFolder: null,
}

const API_BASE_URL = "/api"  // התאימי לפי ה-API שלך

// Async thunk לשליפת תיקיות משתמש
export const fetchUserFolders = createAsyncThunk<FolderItem[]>(
  "folders/fetchUserFolders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<FolderItem[]>(`${API_BASE_URL}/folders`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch folders")
    }
  }
)

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<number | null>) => {
      state.currentFolder = action.payload
    },
    clearFoldersError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFolders.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserFolders.fulfilled, (state, action: PayloadAction<FolderItem[]>) => {
      state.loading = false
      state.folders = action.payload
    })
    builder.addCase(fetchUserFolders.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { setCurrentFolder, clearFoldersError } = foldersSlice.actions

export default foldersSlice.reducer
