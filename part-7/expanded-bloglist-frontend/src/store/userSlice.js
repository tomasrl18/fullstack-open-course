import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  } catch (error) {
    throw new Error("Wrong credentials");
  }
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem("loggedBlogappUser");
  blogService.setToken(null);
  dispatch(clearUser());
};

export default userSlice.reducer;
