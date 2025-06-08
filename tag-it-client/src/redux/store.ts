import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import folderContentsReducer from "./slices/folderContentsSlice"
import themeReducer from "./slices/themeSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    folderContents: folderContentsReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
