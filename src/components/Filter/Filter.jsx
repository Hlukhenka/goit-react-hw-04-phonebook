import css from '../Filter/Filter.module.css';

const Filter = ({ search, value }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          className={css.input}
          placeholder="Search"
          onChange={search}
          value={value}
        ></input>
      </label>
    </>
  );
};

export default Filter;
