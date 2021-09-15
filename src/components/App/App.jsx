import React, { Component } from "react";

import AddContactForm from "../AddContactForm/AddContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import styles from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  #localStorageContactsKey = "contacts";

  componentDidMount() {
    const currentContacts = JSON.parse(
      localStorage.getItem(this.#localStorageContactsKey)
    );

    if (currentContacts) {
      this.setState({ contacts: currentContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts: currentContacts } = this.state;
    const { contacts: prevContacts } = prevState;

    if (currentContacts.length !== prevContacts.length) {
      localStorage.setItem(
        this.#localStorageContactsKey,
        JSON.stringify(currentContacts)
      );
    }
  }

  handleAddContact = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState({ filter: value });
  };

  handleDelete = (id) => {
    const filteredContacts = this.state.contacts.filter(
      (contact) => contact.id !== id
    );

    this.setState({ contacts: filteredContacts });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={styles.mainContainer}>
        <h1>Phonebook</h1>
        <AddContactForm
          handleAddContact={this.handleAddContact}
          contacts={contacts}
        />

        <h2>Contacts</h2>
        <Filter filterText={filter} handleFilter={this.handleFilter} />
        <ContactList
          contacts={contacts}
          filterText={filter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
