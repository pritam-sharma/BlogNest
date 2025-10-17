import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction } from "../globalSlice/globalSlice";
import { resetSuccessAction } from "../globalSlice/globalSlice";
import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//fetch Public posts action
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/posts/public`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch Single posts action
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/posts/${postId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/posts`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!Create post Action
export const addPostsAction = createAsyncThunk(
  "post/create",
  async (postData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/posts`,
        postData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//!Delete post Action
export const deletePostsAction = createAsyncThunk(
  "post/delete-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v1/posts/${postId}`,

        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const updatePostsAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      //convert payload to form data
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/posts/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
//like posts action
export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/posts/like/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//dislike posts action
export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/posts/dislike/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Clape Action
export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/posts/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//post viewcount action
export const postViewCountAction = createAsyncThunk(
  "posts/post-view",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/posts/${postId}/post-view-count`,
        {},
        config
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
    //fetch public post
    builder.addCase(fetchPublicPostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPrivatePostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //delete post
    builder.addCase(deletePostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deletePostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //get single post
    builder.addCase(getPostAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    // Register actions
    builder.addCase(addPostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(addPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(updatePostsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(updatePostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //like
    builder.addCase(likePostAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //dislike
    builder.addCase(dislikePostAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //clap
    builder.addCase(clapPostAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //post view
    builder.addCase(postViewCountAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postViewCountAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(postViewCountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //!resetError Action
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    //!resetSuccess Action
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});
//generate the reducer
const postsReducer = postsSlice.reducer;
export default postsReducer;
