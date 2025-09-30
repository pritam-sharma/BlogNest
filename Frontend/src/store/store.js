import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/users/userSlices";
import postsReducer from "../redux/slices/posts/postSlices";
import categoriesReducer from "../redux/slices/categories/categorySlices";
import commentsReducer from "../redux/slices/comments/commentSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
  },
});
export default store;
