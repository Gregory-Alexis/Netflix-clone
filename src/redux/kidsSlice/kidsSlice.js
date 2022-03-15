import { createSlice } from "@reduxjs/toolkit";

export const kidsSlice = createSlice({
  name: "kidsData",
  initialState: {
    kidsData: [],
    featuredKidsData: [],
    loading: false,
    error: "",
    search: "",
    isInputActive: false,
    featuredDetails: false,
    isHomeScrolled: false,
  },
  reducers: {
    setKidsData: (state, action) => {
      return {
        ...state,
        kidsData: action.payload,
        loading: false,
        error: "",
      };
    },
    setFeaturedData: (state, action) => {
      return {
        ...state,
        featuredKidsData: action.payload,
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
        isInputActive: action.payload,
      };
    },
    setScrolled: (state, action) => {
      return {
        ...state,
        isHomeScrolled: action.payload,
      };
    },
    setFeaturedDetails: (state, action) => {
      return {
        ...state,
        featuredDetails: action.payload,
      };
    },
  },
});

export const {
  setKidsData,
  setFeaturedData,
  setLoading,
  setError,
  setSearch,
  setIsActive,
  setScrolled,
  setFeaturedDetails,
} = kidsSlice.actions;
export default kidsSlice.reducer;
