import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movieData",
  initialState: {
    movieData: [],
    loading: false,
    error: "",
    search: "",
    filter: "all",
    details: false,
    isActive: false,
    isScrolled: false,
    isLinkActive: false,
  },
  reducers: {
    setMovieData: (state, action) => {
      return {
        ...state,
        movieData: action.payload,
        loading: false,
        error: "",
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
        error: false,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    setSearch: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    setDetails: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    setIsActive: (state, action) => {
      return {
        ...state,
        isActive: action.payload,
      };
    },
    setIsScrolled: (state, action) => {
      return {
        ...state,
        isScrolled: action.payload,
      };
    },
    setIsLinkActive: (state, action) => {
      return {
        ...state,
        isLinkActive: action.payload,
      };
    },
  },
});

export const {
  setMovieData,
  setLoading,
  setError,
  setSearch,
  setDetails,
  setFilter,
  setActive,
  setIsScrolled,
  setIsLinkActive,
} = movieSlice.actions;
export default movieSlice.reducer;
