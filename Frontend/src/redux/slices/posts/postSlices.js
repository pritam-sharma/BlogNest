import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};

//fetch Public posts action

export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/posts/public"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Posts Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //Login
    builder.addCase(fetchPublicPostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // //!resetError Action
    // builder.addCase(resetErrorAction, (state) => {
    //   state.error = null;
    // });
    // //!resetSuccess Action

    // builder.addCase(resetSuccessAction, (state) => {
    //   state.success = false;
    // });
  },
});
//generate the reducer
const { reducer: postsReducer } = postsSlice;
export default postsReducer;
