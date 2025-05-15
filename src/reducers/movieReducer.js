import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SET_SEARCH_TERM,
  SET_CURRENT_PAGE,
} from '../actions/movieActions';

const initialState = {
  movies: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  totalPages: 0,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        totalPages: action.payload.totalPages,
        error: null,
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        movies: [],
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducer;
