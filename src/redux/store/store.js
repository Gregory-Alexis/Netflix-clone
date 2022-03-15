import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../homeSlice/homeSlice";
import kidsSlice from "../kidsSlice/kidsSlice";
import movieSlice from "../movieSlice/movieSlice";
import suggestionMovieSlice from "../movieSlice/suggestionMovieSlice";
import myListSlice from "../myListSlice/myListSlice";
import suggestionTvShowsSlice from "../tvShowsSlice/suggestionTvShowsSlice";
import tvShowsSlice from "../tvShowsSlice/tvShowsSlice";

export const store = configureStore({
  reducer: {
    homeData: homeSlice,
    tvShowsData: tvShowsSlice,
    movieData: movieSlice,
    suggestionMovieData: suggestionMovieSlice,
    suggestionTvShowsData: suggestionTvShowsSlice,
    myListData: myListSlice,
    kidsData: kidsSlice,
  },
});
