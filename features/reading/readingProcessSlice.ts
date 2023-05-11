import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentReadingState, ICellBarcode, ILoadUnitBarcode } from "./currentReadingSlice";

export type ReadingState = {
  isRunning: boolean;
  isPaused: boolean;
  vectorDirection: string;
  rackInitialPlace: string;
  rackBays: string;
  rackLevels: string;
  readings: CurrentReadingState[];
  currentPosition: number;
};

const initialState: ReadingState = {
  isRunning: false,
  isPaused: false,
  vectorDirection: "horizontal",
  rackInitialPlace: "",
  rackBays: "",
  rackLevels: "",
  readings: [],
  currentPosition: 0,
};

export const readingProcess = createSlice({
  name: "reading",
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    pause: (state) => {
      state.isPaused = true;
    },
    resume: (state) => {
      state.isPaused = false;
    },
    stop: (state) => {
      state.isRunning = false;
      state.vectorDirection = "horizontal";
      state.rackInitialPlace = "";
      state.rackBays = "";
      state.rackLevels = "";
      state.readings = [];
      state.currentPosition = 0;
    },
    setVectorDirection: (state, action) => {
      state.vectorDirection = action.payload;
    },
    setRackInitialPlace: (state, action) => {
      state.rackInitialPlace = action.payload;
    },
    setRackBays: (state, action) => {
      state.rackBays = action.payload;
    },
    setRackLevels: (state, action) => {
      state.rackLevels = action.payload;
    },
    setCellsBarcodes: (state, action: PayloadAction<ICellBarcode[]>) => {
      action.payload.forEach((cellBarcode) => {
        state.readings.push({ cellBarcode: cellBarcode, loadUnitsBarcodes: [] });
      });
    },
    setLoadUnitsBarcodes: (state, action: PayloadAction<ILoadUnitBarcode>) => {
      state.readings[state.currentPosition].loadUnitsBarcodes.push(action.payload);
    },
    nextPosition: (state) => {
      state.currentPosition++;
    },
  },
});

export const {
  start,
  pause,
  resume,
  stop,
  setVectorDirection,
  setRackInitialPlace,
  setRackLevels,
  setRackBays,
  setCellsBarcodes,
  setLoadUnitsBarcodes,
} = readingProcess.actions;

export default readingProcess.reducer;
