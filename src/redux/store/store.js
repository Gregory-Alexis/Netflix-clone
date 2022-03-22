import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../appSlice/appSlice";
import myListSlice from "../myListSlice/myListSlice";

export const store = configureStore({
  reducer: {
    appData: appSlice,
    myListData: myListSlice,
  },
});
