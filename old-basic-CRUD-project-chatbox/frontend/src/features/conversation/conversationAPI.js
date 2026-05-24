import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectConversation } from "./conversationSlice";

// send message thunk
export const sendMessage = createAsyncThunk(
  "conversation/sendMessage",
  async (message, thunkAPI) => {
    try {
      console.log("i am at sendMessage thunk");
      console.log("incoming message at sendMessage thunk => ", message);

      // accesing Redux state
      const state = thunkAPI.getState();
      const selectedConversation = state.conversation.selectedConversation;

      console.log(
        "other user id at sendMessage thunk => ",
        selectedConversation._id
      );

      const res = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      //checking
      if (!res.ok) {
        const data = await res.json();
        console.log("data at sendMessage thunk =>", data);
        return thunkAPI.rejectWithValue(message);
      }

      const result = await res.json();
      console.log("res data at sendMessage thunk =>", result);
      return result; // ✅ return this so it's received as `action.payload`
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// get messages thunk

export const getMessages = createAsyncThunk(
  "conversation/getMessages",
  async (_, thunkAPI) => {
    try {
      console.log("I am in getMessages thunk");

      // accessing Reduc state
      const state = thunkAPI.getState();
      const selectedConversation = state.conversation.selectedConversation;

      console.log(
        "*** other use id at getMessages thunk =>",
        selectedConversation?._id
      );

      // hit request to end point
      const res = await fetch(
        `http://localhost:5000/api/message/${selectedConversation?._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      //checking
      if (!res.ok) {
        const data = await res.json();
        console.log(" data (messages) at getMessages (if failed) =>", data);
        return thunkAPI.rejectWithValue("Cannot get messages");
      }

      const result = await res.json();
      console.log("🟩 FULL response from /getMessages API:", result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const selectConversationById = (userId) => (dispatch, getState) => {
  const contacts = getState().contacts.contacts;
  const user = contacts.find((c) => c._id === userId);
  if (user) {
    dispatch(selectConversation(user));
  }
};
