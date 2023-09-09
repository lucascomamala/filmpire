import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategorySlice = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategorySlice.actions;

export default genreOrCategorySlice.reducer;
