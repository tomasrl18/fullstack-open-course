import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./store/notificationSlice";
import blogReducer from "./store/blogSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

export default store;
