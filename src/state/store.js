import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "./TMDB";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(tmdbApi.middleware),
});
