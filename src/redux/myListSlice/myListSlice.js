import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    myList: [],
    quantity: 0,
  },
  reducers: {
    addToList: (state, action) => {
      state.myList.push(action.payload);
      state.quantity += 1;
    },

    removeToList: (state, action) => {
      return {
        myList: state.myList.filter((movie) => movie.id !== action.payload),
        quantity: state.quantity - 1,
      };
    },
  },
});

export const { addToList, removeToList } = myListSlice.actions;
export default myListSlice.reducer;
