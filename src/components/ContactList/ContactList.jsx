import React from "react";
import PropTypes from "prop-types";

import s from "./ContactList.module.css";

const ContactList = ({ contacts, filterText, handleDelete }) => {
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <ul className={s.contactsList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.contactsItem}>
          <p className={s.contactsName}>
            {name}: {number}
          </p>

          <button
            className={s.contactsBtn}
            type="button"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
