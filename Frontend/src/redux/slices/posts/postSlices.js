import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};
