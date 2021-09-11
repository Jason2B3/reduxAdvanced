import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        // Payload must be { status: ~, title: ~, message: ~ }
        // Sets the notification state equal to an object with the following keys
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    skipNotification(state, action) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
