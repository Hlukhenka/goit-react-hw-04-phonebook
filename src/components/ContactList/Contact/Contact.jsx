import css from '../Contact/Contact.module.css';

const Contact = ({ number, name, id, onDelete }) => {
  return (
    <li key={id} className={css.item}>
      <span className={css.span}>
        {name}: {number}
      </span>
      <button onClick={() => onDelete(id)} className={css.button}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
