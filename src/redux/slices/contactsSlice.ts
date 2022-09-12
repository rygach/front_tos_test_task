import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { serviceApi } from '../../api/generalApi';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type ContactType = {
  _id: string;
  name: string;
};

interface IContactSlice {
  contacts: ContactType[];
  status: Status;
}

const initialState: IContactSlice = {
  contacts: [],
  status: Status.LOADING,
};

export const getUsersThunk = createAsyncThunk('user/getUsers', async (params, { dispatch }) => {
  const result = await serviceApi.contacts.getContacts();
  dispatch(putContacts(result.data));
});

export const createUserThunk = createAsyncThunk('user/create', async (name: any, { dispatch }) => {
  await serviceApi.contacts.create(name);
  dispatch(getUsersThunk());
});

const contactsSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    putContacts(state, action) {
      state.contacts = action.payload;
    },
    setContact(state, action: PayloadAction<ContactType>) {
      state.contacts.push(action.payload);
    },
    // editContact(state, action: PayloadAction<ContactType>) {
    //   const idx = action.payload._id - 1;
    //   const changed = {
    //     id: action.payload._id,
    //     name: action.payload.name,
    //   };
    //   state.contacts.splice(idx, 1, changed);
    // },
    delContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter((obj) => obj._id !== action.payload);
    },

    // стоит доработать, либо убрать отсюда полностью
    // setSearchValue(state, action: PayloadAction<string>) {
    //   let check;
    //   const newCont = state.contacts.filter((elem: ContactType) => {
    //     elem.name.includes(action.payload);
    //     check = elem;
    //   });
    //   state.searchCont.push(...newCont);
    //   console.log(action.payload);
    //   console.log(newCont);
    //   console.log(check);
    // },
  },
});

export const selectContact = (state: RootState) => state.contact;

export const { putContacts, setContact, delContact } = contactsSlice.actions;

export default contactsSlice.reducer;
