import { useState } from 'react';

import { toast } from 'react-toastify';
import { FaSistrix } from 'react-icons/fa';
import PropTypes from 'prop-types';

import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase().trim());
  };

  const reset = () => {
    setSearchQuery('');
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!searchQuery) {
      toast.info('Please write search query.');
      return;
    }

    if (searchQuery === prevSearchQuery) {
      toast.info(
        `"${searchQuery}" search completed. Enter a different search query`
      );
      reset();
      return;
    }

    setPrevSearchQuery(searchQuery);
    props.formSubmitHandler(searchQuery);
    reset();
  };

  return (
    <SearchbarSection>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchFormButton type="submit">
          <FaSistrix style={{ width: 20, height: 20 }} />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={searchQuery}
        />
      </SearchForm>
    </SearchbarSection>
  );
}

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
