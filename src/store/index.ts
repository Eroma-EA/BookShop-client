import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
import reviewSlice from "./slices/reviewSlice";
import categrySlice from "./slices/categrySlice";
import likedSlice from "./slices/likedSlice";

const combineReducer = combineReducers({
  user: userSlice,
  books: bookSlice,
  reviews: reviewSlice,
  categrySlice,
  likedSlice,
});

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
