import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // Uses localStorage by default
import { combineReducers } from "redux"
import userReducer from "./slices/userSlice"
import fileReducer from "./slices/filesSlice" // Assuming you have a filesSlice
// Import other reducers as needed

// Configuration for redux-persist
const persistConfig = {
  key: "tagit-root", // Key for the localStorage entry
  storage,
  whitelist: ["user", "files"], // Persist both user and files reducers
  version: 1, // Add version for potential migrations
  debug: process.env.NODE_ENV !== "production", // Enable debug in development
}

// Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer, // Assuming you have a filesReducer
  // Add other reducers here
})

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types in the serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

// Create the persistor
export const persistor = persistStore(store)

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
