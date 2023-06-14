import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentReadingState, ICellBarcode, ILoadUnitBarcode } from "./currentReadingSlice";

type Readings = {
  cellBarcode: ICellBarcode;
  loadUnitsBarcodes: ILoadUnitBarcode[];
  isInFirebase: boolean;
};

export type ReadingListState = {
  readings: Readings[];
};

const initialState: ReadingListState = {
  readings: [],
};

export const readingsList = createSlice({
  name: "reading",
  initialState,
  reducers: {
    setReadings: (state, action: PayloadAction<Readings[]>) => {
      state.readings = action.payload;
    },
  },
});

export const { setReadings } = readingsList.actions;

export default readingsList.reducer;
