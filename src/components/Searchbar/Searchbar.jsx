import { useState } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

import * as Notify from 'services/notifications';

import React from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return Notify.NotificationWarning(Notify.EMPTY_QUERY_MESSAGE);
    }
    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.searchbarContainer}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchFormButton} type="submit">
          <ImSearch style={{ width: '1.5em', height: '1.5em' }} />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </form>
    </header>
  );
};

export default Searchbar;
