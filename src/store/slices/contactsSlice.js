import { createSlice } from "@reduxjs/toolkit";

export const contactsSLice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {
    addContacts: (state, action) => {
      state.push(action.payload);
    },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload.id);
    },
    editContact: (state, action) => {
      const isContactIndex = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (isContactIndex != -1) {
        state[isContactIndex] = action.payload;
      }
    },
  },
});

export const { addContacts, editContact, deleteContact } =
  contactsSLice.actions;

export const contactsReducer = contactsSLice.reducer;
