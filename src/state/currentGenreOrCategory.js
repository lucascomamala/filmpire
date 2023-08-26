import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategorySlice = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload)
      // state.genreOrCategoryName = action.payload;
    }
  }
});

export const { selectGenreOrCategory } = genreOrCategorySlice.actions;

export default genreOrCategorySlice.reducer;
