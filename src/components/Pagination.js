import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex list-none items-center">
        <li
          className={`px-4 py-2 cursor-pointer flex items-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handlePrevious}
        >
          <FaArrowLeft />
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-4 py-2 cursor-pointer flex items-center ${number === currentPage ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`px-4 py-2 cursor-pointer flex items-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleNext}
        >
          <FaArrowRight />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
