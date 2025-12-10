import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "regenerator-runtime/runtime";




export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY");
  const data = await res.json();
  return data.results.books; // adjust based on API response
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false,
    error: null,
    sortBy: "title", 
    order: "asc" 
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.payload;
      });
  }
});

export const { setSortBy, setOrder } = bookSlice.actions;
export default bookSlice.reducer;


