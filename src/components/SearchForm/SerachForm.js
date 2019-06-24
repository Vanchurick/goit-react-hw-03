import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSearch, value, onSubmit }) => (
  <form className={styles.searchForm} onSubmit={onSubmit}>
    <input
      type="text"
      autoComplete="off"
      placeholder="Search images..."
      onChange={onSearch}
      value={value}
    />
  </form>
);

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
