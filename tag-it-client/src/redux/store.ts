import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // Uses localStorage by default
import { combineReducers } from "redux"
import userReducer from "./slices/userSlice"
// Import other reducers as needed

// Configuration for redux-persist
const persistConfig = {
  key: "tagit-root", // Key for the localStorage entry
  storage,
  whitelist: ["user"], // Only persist these reducers (optional)
  // blacklist: ['someReducer'], // Don't persist these reducers (optional)
}

// Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
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
})

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store