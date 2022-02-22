import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
  loading: "idle",
};

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    candidatesLoading(state, _action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    candidatesReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.candidates = action.payload;
      }
    },
  },
});

export const { candidatesLoading, candidatesReceived } =
  candidatesSlice.actions;

export const fetchCandidates = () => async (dispatch) => {
  dispatch(candidatesLoading());
  let candidates;
  await fetch("http://localhost:3010/candidates").then((res) =>
    res.json().then((res) => (candidates = res))
  );
  dispatch(candidatesReceived(candidates));
};

export default candidatesSlice.reducer;
