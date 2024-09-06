import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  bookCategory: null,
  users: null,
  books: null,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setBookCategory: (state, action) => {
      state.bookCategory = action.payload.bookCategory;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setBooks: (state, action) => {
      state.books = action.payload.books;
    },
  },
});

export const {
  setMode,
  setBooks,
  setBookCategory,
  setUsers,
} = authState.actions;

export default authState.reducer;
