import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import axios from "axios";
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false,
  },
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//!Register Action
export const registerAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/users/register`,
        payload
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
//!Login Action
// export const loginAction = createAsyncThunk(
//   "user/login",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     //make request
//     try {
//       const { data } = await axios.post(
//         `${API_BASE_URL}/api/v1/users/login`,
//         payload
//       );
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );
export const loginAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/users/login`,
        payload,
        { withCredentials: true } // important for refresh cookie
      );
      // Store user info & access token in localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          _id: data._id,
          username: data.username,
          email: data.email,
          role: data.role,
        })
      );
      localStorage.setItem("accessToken", data.token);

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
// //!Logout Action
// export const logoutAction = createAsyncThunk("user/logout", async () => {
//   localStorage.removeItem("userInfo");
//   return true;
// });
export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // Clear local storage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");

      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);
export const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/users/refresh`,
      {},
      { withCredentials: true }
    );
    localStorage.setItem("accessToken", data.token);
    return data.accessToken;
  } catch (err) {
    console.error("Refresh token failed:", err);
    return null;
  }
};

//!getPublicProfile Action
export const userPublicProfileAction = createAsyncThunk(
  "user/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/users/public-profile/${userId}`,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //Register
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //getPublicProfile
    builder.addCase(userPublicProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.profile = action.payload;
    });
    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.userInfo = null;
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
const usersReducer = usersSlice.reducer;
export default usersReducer;
