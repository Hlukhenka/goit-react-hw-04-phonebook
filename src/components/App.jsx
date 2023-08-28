import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const KEY = 'contact-list';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage(KEY, initialContacts);
  const [filter, setFilter] = useState('');

  const getfilteredContact = () => {
    const filteredContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filter ? filteredContact : contacts;
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contact = {
      name: evt.currentTarget.elements.name.value,
      number: evt.currentTarget.elements.number.value,
      id: nanoid(),
    };

    const prevContactNames = contacts.map(contact => contact.name);
    const prevContactNumbers = contacts.map(contact => contact.number);

    if (prevContactNames.includes(contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    if (prevContactNumbers.includes(contact.number)) {
      alert(`Contact with number ${contact.number} already exists`);
      return;
    }

    setContacts(prevContacts => [contact, ...prevContacts]);
    evt.currentTarget.reset();
  };

  const filterContact = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm submit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter search={filterContact} value={filter} />
      <ContactList contacts={getfilteredContact()} onDelete={deleteContact} />
    </>
  );
};

export default App;
