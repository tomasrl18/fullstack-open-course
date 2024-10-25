import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./store/notificationSlice";
import blogReducer from "./store/blogSlice";
import userReducer from "./store/userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
