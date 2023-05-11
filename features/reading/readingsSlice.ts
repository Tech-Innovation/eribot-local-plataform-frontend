import { createSlice } from "@reduxjs/toolkit";
import { CurrentReadingState } from "./currentReadingSlice";

export type ReadingsState = {
  readings: CurrentReadingState[];
};

const initialState: ReadingsState = {
  readings: [],
};

export const readingsSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    addReading: (state, action) => {
      state.readings.push(action.payload);
    },
    cleanReadings: (state) => {
      state.readings = [];
    },
  },
});

export const { addReading, cleanReadings } = readingsSlice.actions;

export default readingsSlice.reducer;
