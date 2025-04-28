import { AuthResponse } from "@/types/AuthResponse";
import { User } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AuthResponse = {
  user: {} as User,
  token: "",
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.user = {} as User;
      state.token = "";
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;