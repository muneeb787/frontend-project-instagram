import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../hooks/axios";
import { toast } from "react-toastify";

let initialState = {
  user: JSON.parse(window.localStorage.getItem("user"))?? {},
  token: window.localStorage.getItem("token") || "",
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk("user", async (body, { rejectWithValue }) => {
  
  const axiosInstance = useAxios();
  try {
    let res = await axiosInstance.post("/login", body);
    console.log(res);
    toast.success("user logged in successfully")
    return res.data;
  } catch (error) {
    toast.error("User Failed to Login")
    return rejectWithValue(error.response);
  }
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
      console.log("add Token");
    },
    addUser: (state) => {
      state.user = localStorage.getItem("user");
      console.log("add User");
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = "";
      state.token = "";
      console.log("Logged Out");
    },
    updateUserData: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("login Pending");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        console.log("login fullfilled");
      })
      .addCase(loginUser.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload.data.message
        console.log("login rejected");
      });
  },
});

export const { addToken, addUser, clearError, logout, updateUserData } = authSlice.actions;
export default authSlice.reducer;
