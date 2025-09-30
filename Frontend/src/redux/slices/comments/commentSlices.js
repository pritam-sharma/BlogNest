import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction } from "../globalSlice/globalSlice";
import { resetSuccessAction } from "../globalSlice/globalSlice";
import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  comments: [],
  comment: null,
};

//!Create Comment Action
export const createCommentAction = createAsyncThunk(
  "comments/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/comments/${payload?.postId}`,
        {
          message: payload?.message,
        },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
//Comments Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      //   state.success = true;
      state.error = null;
      state.comment = action.payload;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
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

const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
