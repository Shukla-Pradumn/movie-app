import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/api';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : '../../posterPlaceholder.png'; // You would need this placeholder image in your public folder

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterPath} alt={`${movie.title} poster`} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-release-date">
          Release Date: {movie.release_date}
        </div>
        <div className="movie-rating">
          Rating: {movie.vote_average.toFixed(1)}/10
        </div>
        <div className="movie-overview">
          <p>
            {movie.overview.length > 150
              ? `${movie.overview.substring(0, 150)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
