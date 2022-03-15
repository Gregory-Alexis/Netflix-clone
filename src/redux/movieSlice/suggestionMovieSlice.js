import { createSlice } from "@reduxjs/toolkit";

const suggestionMovieSlice = createSlice({
  name: "suggestionMovieData",
  initialState: {
    suggestionMovieData: [],
    loading: false,
    error: "",
    search: "",
    isActive: false,
    isScrolled: false,
    isLinkActive: false,
  },
  reducers: {
    setSuggestionMovieData: (state, action) => {
      return {
        ...state,
        suggestionMovieData: action.payload,
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
  setSuggestionMovieData,
  setLoading,
  setError,
  setSearch,
  setIsActive,
  setIsScrolled,
  setIsLinkActive,
} = suggestionMovieSlice.actions;
export default suggestionMovieSlice.reducer;
