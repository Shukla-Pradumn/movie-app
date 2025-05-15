// Base URL
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f94a52e6266f569ea1eec187c6666f13';

// Image configuration
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'w1280';

// API endpoints
export const API_ENDPOINTS = {
  POPULAR: `${API_BASE_URL}/movie/popular?api_key=${API_KEY}`,
  SEARCH: `${API_BASE_URL}/search/movie?api_key=${API_KEY}`,
};

// Fetch movies with search query or get popular movies if there is no query
export const fetchMovies = async (searchTerm = '', page = 1) => {
  try {
    const endpoint = searchTerm
      ? `${API_ENDPOINTS.SEARCH}&query=${encodeURIComponent(
          searchTerm
        )}&page=${page}`
      : `${API_ENDPOINTS.POPULAR}&page=${page}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
