// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import newsReducer from "./slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },

});
