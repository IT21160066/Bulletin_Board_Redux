import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  //hanlde thunk at the the outside of the slice
  extraReducers(builder) {
    //Adds a case reducer to handle a single exact action type.
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
      //replace user state completely
      //completley overriding the state
      //we are not going to accidently add in the users twice
    });
  },
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
