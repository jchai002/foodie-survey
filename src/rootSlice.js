import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    q1: "",
    q2: "",
    q3: "",
  },
  reducers: {
    q1Answer: (state, action) => {
      state.q1 = action.payload;
    },
    q2Answer: (state, action) => {
      state.q2 = action.payload;
    },
    q3Answer: (state, action) => {
      state.q3 = action.payload;
    },
  },
});

export const reducer = rootSlice.reducer;

export const { q1Answer, q2Answer, q3Answer } = rootSlice.actions;
