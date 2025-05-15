import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import '../styles/MovieList.css';

const MovieList = () => {
  const { movies, loading, error } = useSelector((state) => state.movies);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">No movies found. Try a different search.</div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
