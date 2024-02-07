import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import useReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: useReducer,
  },
});
