import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("auth") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload || null;
      localStorage.setItem("auth", "true");

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
