import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export type ReadingNotification = {
  isOpen: boolean;
  message: string;
  severity: AlertColor | undefined;
};

const initialState: ReadingNotification = {
  isOpen: false,
  message: "",
  severity: "success",
};

export const readingNotification = createSlice({
  name: "reading",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
  },
});

export const { open, close, setMessage, setSeverity } = readingNotification.actions;

export default readingNotification.reducer;
