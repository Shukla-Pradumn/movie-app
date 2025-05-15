import { fetchMovies } from '../utils/api';

// Action Types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action Creators
export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (movies, totalPages) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { movies, totalPages },
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const getMovies = (searchTerm = '', page = 1) => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());

    try {
      const data = await fetchMovies(searchTerm, page);
      dispatch(fetchMoviesSuccess(data.results, data.total_pages));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const searchMovies = (searchTerm) => {
  return (dispatch) => {
    dispatch(setSearchTerm(searchTerm));
    dispatch(setCurrentPage(1)); // Reset to first page
    dispatch(getMovies(searchTerm, 1));
  };
};

export const changePage = (page) => {
  return (dispatch, getState) => {
    const { searchTerm } = getState().movies;
    dispatch(setCurrentPage(page));
    dispatch(getMovies(searchTerm, page));
  };
};
