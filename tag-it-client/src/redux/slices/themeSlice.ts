import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface ThemeState {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
}

const initialState: ThemeState = {
  theme: "light",
  fontSize: "medium",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
      localStorage.setItem("tagit-theme", action.payload)
    },
    setFontSize: (state, action: PayloadAction<"small" | "medium" | "large">) => {
      state.fontSize = action.payload
      localStorage.setItem("tagit-fontSize", action.payload)
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem("tagit-theme") as "light" | "dark" | "system" | null
      const savedFontSize = localStorage.getItem("tagit-fontSize") as "small" | "medium" | "large" | null

      if (savedTheme) {
        state.theme = savedTheme
      }
      if (savedFontSize) {
        state.fontSize = savedFontSize
      }
    },
  },
})

export const { setTheme, setFontSize, initializeTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state: RootState) => state.theme.theme
export const selectFontSize = (state: RootState) => state.theme.fontSize

export default themeSlice.reducer
