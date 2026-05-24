import { createSlice } from "@reduxjs/toolkit";
import { sendMessage, getMessages } from "./conversationAPI.js";

const initialState = {
  selectedConversation: null,
  messages: [],
  loading: false,
  error: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      console.log(state.selectedConversation);
      state.selectedConversation = action.payload;
    },

    cleanUp: (state, action) => {
      state.selectedConversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        // ❌ DO NOT modify state.messages here
        // ✅ Let component dispatch getMessages after this
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload at conversation Slice =>", action.payload);
        state.messages = action.payload; // ✅ full message array from backend
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { selectConversation, cleanUp } = conversationSlice.actions;

export default conversationSlice.reducer;

/*
🎯 Goal:
We want:

 getMessages to fully set messages array with fresh data from the server.
 sendMessage to not mutate messages directly (no push).
 Instead, refetch messages after sending (which you're already doing in component).

*/
