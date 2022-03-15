import { createSlice } from "@reduxjs/toolkit";

export const tvShowsSlice = createSlice({
  name: "tvShowsData",
  initialState: {
    data: [],
    featuredTvShowsData: [],
    loading: false,
    error: "",
    isActive: false,
    filter: "all",
    search: "",
    details: false,
    isScrolled: false,
    isLinkActive: false,
    width: window.innerWidth,
  },
  reducers: {
    setTvShowsData: (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    },
    setFeaturedTvShowsData: (state, action) => {
      return {
        ...state,
        featuredTvShowsData: action.payload,
      };
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload,
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
    setIsActive: (state, action) => {
      return {
        ...state,
        isActive: action.payload,
      };
    },
    setSearch: (state, action) => {
      return {
        ...state,
        search: action.payload,
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
    setDetails: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    setWidth: (state, action) => {
      return {
        ...state,
        width: action.payload,
      };
    },
  },
});

export const {
  setTvShowsData,
  setFeaturedTvShowsData,
  setLoading,
  setError,
  setSearch,
  setIsActive,
  setFilter,
  setIsScrolled,
  setIsLinkActive,
  setDetails,
} = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
