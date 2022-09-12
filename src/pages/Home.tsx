import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import { serviceApi } from '../api/generalApi';
import axiosSource from '../api/generalApi';
import { Contact } from '../components/Contact/Contact';
import Search from '../components/Search/Search';
import {
  ContactType,
  createUserThunk,
  getUsersThunk,
  putContacts,
  selectContact,
  setContact,
} from '../redux/slices/contactsSlice';

const Home: React.FC = () => {
  const { contacts } = useSelector(selectContact);
  const dispatch = useAppDispatch();
  const [clearValue, setClearValue] = useState('');

  const inputValue = React.useRef<HTMLInputElement>(null);

  const onAddContact = async (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.current !== null && inputValue.current.value.trim() !== '') {
      const name = inputValue.current.value;

      dispatch(createUserThunk({ name: name }));
    }
    setClearValue('');
  };

  const retrieveContacts = async () => {
    const responseFromServer = await serviceApi.contacts.getContacts();
    return responseFromServer;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) dispatch(putContacts(allContacts.data));
    };

    getAllContacts();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <div className="nav_box">
            <Search />
            <div className="header_link">
              <Link to="/auth">log out</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <h2>CONTACT LIST</h2>
          <form onSubmit={onAddContact} className="cont_list_header">
            <input ref={inputValue} type="text" className="cont_add_inp" />
            <button type="submit" className="add_contact_btn">
              add
            </button>
          </form>
          <div className="contact_list">
            {contacts.map((item) => (
              <Contact key={item._id} _id={item._id} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
