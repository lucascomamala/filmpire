import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer from "./currentGenreOrCategory";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
  },
  middleware: (getDefault) => getDefault().concat(tmdbApi.middleware),
});
