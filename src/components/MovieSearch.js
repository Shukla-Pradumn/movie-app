import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, searchMovies } from '../actions/movieActions';
import MovieList from './MovieList';
import Pagination from './Pagination';
import '../styles/MovieSearch.css';

// Debounce hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.movies);

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const debouncedTerm = useDebounce(localSearchTerm, 500);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm.trim()) {
      dispatch(searchMovies(debouncedTerm));
    } else {
      dispatch(getMovies());
    }
  }, [dispatch, debouncedTerm]);

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
  };

  return (
    <div className="movie-search-container">
      <div className="search-header">
        <h1>Movie Search App</h1>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          {localSearchTerm && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <MovieList />
      <Pagination />
    </div>
  );
};

export default MovieSearch;
