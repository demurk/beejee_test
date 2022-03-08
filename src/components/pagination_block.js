import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { changePage } from "../redux/actions/pagination";

import "../styles/pagination_block.scss";

const PaginationBlock = ({ maxPageIndex }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageWrapper = (index) => {
    if (index > 0 && index <= maxPageIndex) {
      setCurrentPage(index);
    }
  };

  useEffect(() => {
    dispatch(changePage(currentPage));
  }, [currentPage]);

  return (
    <div className="pagination">
      <img
        src="dec_max.svg"
        className="noselect"
        onClick={() => {
          setCurrentPageWrapper(1);
        }}
      />
      <img
        src="dec_one.svg"
        className="noselect"
        onClick={() => {
          setCurrentPageWrapper(currentPage - 1);
        }}
      />
      <div className="pagination-index">{currentPage}</div>
      <img
        src="inc_one.svg"
        className="noselect"
        onClick={() => {
          setCurrentPageWrapper(currentPage + 1);
        }}
      />
      <img
        src="inc_max.svg"
        className="noselect"
        onClick={() => {
          setCurrentPageWrapper(maxPageIndex);
        }}
      />
    </div>
  );
};

export default PaginationBlock;
