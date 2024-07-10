import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import { loadState } from "./storage";
import { JWT_PERSISTENT_STATE, UserPersistentState } from "./user.slice";
import { RootState } from "./store";
import { Notification } from "../interfaces/notification.interface";

export interface NotificationsState {
  jwt: string | null;
  notifications: Notification[] | null;
  notificationErrorMessage?: string;
}

const initialState: NotificationsState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  notifications: null,
};

export const getNotifications = createAsyncThunk<
  NotificationsState,
  void,
  { state: RootState }
>("notifications", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const jwt = state.user.jwt;
  const { data } = await axios.get<NotificationsState>(
    `${PREFIX}notifications`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return data;
});

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.notificationErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.notifications = action.payload;
        }
      )
      .addCase(getNotifications.rejected, (state, action) => {
        state.notificationErrorMessage = action.error.message;
      });
  },
});

export default notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;