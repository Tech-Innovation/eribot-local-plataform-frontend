import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "@features/counter/counterSlice";
import readingProcess from "@/features/reading/readingProcessSlice";
import readingsSlice from "./features/reading/readingsSlice";
import readingNotification from "./features/reading/readingNotificationSlice";
import connectionSlice from "./features/connection/connectionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    readingProcess: readingProcess,
    readings: readingsSlice,
    readingNotification: readingNotification,
    connection: connectionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
