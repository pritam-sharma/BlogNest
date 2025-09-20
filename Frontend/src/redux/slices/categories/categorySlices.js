import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrorAction } from "../globalSlice/globalSlice";
import { resetSuccessAction } from "../globalSlice/globalSlice";
import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  categories: [],
  category: null,
};

//fetch Public categories action
export const fetchCategoriesAction = createAsyncThunk(
  "categories/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //http call
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/categories"
      );
      console.log("data from categorySlices", data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//categories Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //categories
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // //!resetError Action
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    // //!resetSuccess Action

    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});
//Generate the reducer
const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
