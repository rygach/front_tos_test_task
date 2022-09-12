import React, { FormEvent } from 'react';
import { useAppDispatch } from '../../redux/store';

import { serviceApi } from '../../api/generalApi';
import axiosSource from '../../api/generalApi';
import { ContactType, delContact } from '../../redux/slices/contactsSlice';

export const Contact: React.FC<ContactType> = ({ _id, name }) => {
  const dispatch = useAppDispatch();
  const inputValue = React.useRef<HTMLInputElement>(null);

  const onDelContact = async (e: FormEvent) => {
    e.preventDefault();
    await serviceApi.contacts.remove(_id);
    dispatch(delContact(_id));
  };

  const onEditContact = async (e: FormEvent) => {
    e.preventDefault();
    // if (inputValue.current !== null && inputValue.current.value.trim() !== '') {
    //   const changed: ContactType = {
    //     id: id,
    //     name: inputValue.current.value,
    //   };
    //   await serviceApi.contacts.update(changed);
    //   dispatch(editContact(changed));
    // }
  };

  return (
    <form onSubmit={onEditContact} className="contact_item">
      <p>{name}</p>
      <input ref={inputValue} type="text" className="edit_cont_title" />
      <button className="edit_btn" type="submit">
        edit
      </button>
      <button className="delete_btn" onClick={onDelContact}>
        delete
      </button>
      <div className="edit_cont_box">
        <input type="text" className="edit_cont_input" />
        <button className="edit_cont_btn">save</button>
      </div>
    </form>
  );
};
