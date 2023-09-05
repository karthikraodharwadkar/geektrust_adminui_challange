import React from "react";
import './Pagination.css'

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
  setSelectedRowEntry
}) {
  const pageNumber = (totalPages) => {
    let pages = [];
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      pages.push(currentPage);
    }
    return pages;
  };

  const getPageNumbers = pageNumber(totalPages);

  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRowEntry([])
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRowEntry([])
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRowEntry([])
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRowEntry([])
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    setSelectedRowEntry([])
  };
  return (
    <div className="pagination-container">
      <span>
        Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
      </span>
      <div className="pagination-btn">
        <button onClick={handleFirstPage} disabled={currentPage===1}>{"<<"}</button>
        <button onClick={handlePreviousPage} disabled={currentPage===1}>{"<"}</button>
        {getPageNumbers.map((page, index) => (
          <button key={index} onClick={() => handlePage(page)} className="pagenumbers" id={index===currentPage-1 ? "livepage":""}>
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage===totalPages}>{">"}</button>
        <button onClick={handleLastPage} disabled={currentPage===totalPages}>{">>"}</button>
      </div>
    </div>
  );
}
