import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../actions/movieActions';
import '../styles/Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.movies);

  // Calculate page range
  const getPageRange = () => {
    const range = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div>
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => dispatch(changePage(1))}
        >
          &laquo;
        </button>

        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => dispatch(changePage(currentPage - 1))}
        >
          &lsaquo;
        </button>

        {getPageRange().map((page) => (
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => dispatch(changePage(page))}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(changePage(currentPage + 1))}
        >
          &rsaquo;
        </button>

        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(changePage(totalPages))}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
