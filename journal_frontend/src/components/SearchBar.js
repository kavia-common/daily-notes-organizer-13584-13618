import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * SearchBar - Simple input to filter notes. Debouncing is not added to keep it straightforward.
 * Props:
 * - query: string
 * - onChange(value: string)
 */
function SearchBar({ query, onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="input input-search"
        placeholder="Search notes by title, content, or tag..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
      />
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
