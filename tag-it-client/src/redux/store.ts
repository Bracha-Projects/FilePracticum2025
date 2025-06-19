import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage" 
import userReducer from "./slices/userSlice"
import folderContentsReducer from "./slices/folderContentsSlice"
import themeReducer from "./slices/themeSlice"
import userStatsReducer from "./slices/userStatsSlice"
import recentFilesReducer from "./slices/recentFilesSlice"
import activityReducer from "./slices/activitySlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "folderContents", "theme"], 
}

const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  folderContents: persistReducer(persistConfig, folderContentsReducer),
  theme: persistReducer(persistConfig, themeReducer),
  userStats: userStatsReducer,
  recentFiles: recentFilesReducer,
  activity: activityReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
