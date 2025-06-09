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
import storage from "redux-persist/lib/storage" // localStorage
import userReducer from "./slices/userSlice"
import folderContentsReducer from "./slices/folderContentsSlice"
import themeReducer from "./slices/themeSlice"

// הגדרות לשמירת כל ה-slices ב-localStorage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "folderContents", "theme"], // רק הסלייסים שרוצים לשמור
}

// שילוב ה-reducers עם persistReducer
const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  folderContents: persistReducer(persistConfig, folderContentsReducer),
  theme: persistReducer(persistConfig, themeReducer),
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // התעלמות מפעולות של redux-persist כדי למנוע אזהרות
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store) // יצירת persistor לשימוש ברכיב React

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
