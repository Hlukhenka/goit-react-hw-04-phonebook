import Contact from './Contact/Contact';
import css from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <>
      <ul className={css.list}>
        {contacts.map(({ name, number, id }) => (
          <Contact
            key={id}
            name={name}
            number={number}
            id={id}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
