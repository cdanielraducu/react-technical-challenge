import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice";
import candidatesReducer from "./slices/candidatesSlice";

const rootReducer = {
  questions: questionsReducer,
  candidates: candidatesReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
