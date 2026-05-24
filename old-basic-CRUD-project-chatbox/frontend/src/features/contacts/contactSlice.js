import { createSlice } from "@reduxjs/toolkit";
import { getContacts } from "./contactAPI.js";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action =>", action);
        console.log("action.paylaod => ", action.payload);
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = contactsSlice.actions;

export default contactsSlice.reducer;
