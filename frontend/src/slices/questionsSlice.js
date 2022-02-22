import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: "idle",
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionsLoading(state, _action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    questionsReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.candidates = action.payload;
      }
    },
  },
});

export const { questionsLoading, questionsReceived } = questionsSlice.actions;

export const fetchQuestions = () => async (dispatch) => {
  dispatch(questionsLoading());
  let questions;
  await fetch("http://localhost:3010/questions").then((res) =>
    res.json().then((res) => {
      questions = res;
    })
  );
  dispatch(questionsReceived(questions));
};

export default questionsSlice.reducer;
