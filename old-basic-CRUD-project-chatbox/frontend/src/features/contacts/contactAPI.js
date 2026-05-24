import { createAsyncThunk } from "@reduxjs/toolkit";

// getContacts thunk

export const getContacts = createAsyncThunk(
  "contact/all", // action type
  async (_, thunkAPI) => {
    try {
        console.log("i am at getContacts thunk");
      const res = await fetch("http://localhost:5000/api/contact/all", {
        method: "GET",
        credentials: "include", // ✅ required here too!
      });

      if (!res.ok) {
        const data = await res.json();
        return thunkAPI.rejectWithValue(data.message); // error case
      }

      const data = await res.json();
      console.log("data at getContacts Thunk => ", data);
      return data; // this becomes payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
