import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./store/notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
