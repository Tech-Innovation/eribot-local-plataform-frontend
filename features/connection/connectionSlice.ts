import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Connection = {
  webSocketIsConnected: boolean;
  cameraIsConnected: boolean;
};

const initialState: Connection = {
  webSocketIsConnected: false,
  cameraIsConnected: false,
};

export const connectionSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    setWebSocketConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.webSocketIsConnected = action.payload;
    },
    setCameraConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.cameraIsConnected = action.payload;
    },
  },
});

export const { setWebSocketConnectionStatus, setCameraConnectionStatus } = connectionSlice.actions;

export default connectionSlice.reducer;
