import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/users/userSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
export default store;
