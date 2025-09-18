import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/users/userSlices";
import postsReducer from "../redux/slices/posts/postSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});
export default store;
