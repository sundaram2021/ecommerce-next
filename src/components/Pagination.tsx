import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxButtons = 5;
  const buttonOffset = Math.floor(maxButtons / 2);

  let startPage = Math.max(currentPage - buttonOffset, 1);
  let endPage = Math.min(startPage + maxButtons - 1, totalPages);

  if (totalPages >= maxButtons && endPage - startPage < maxButtons - 1) {
    startPage = endPage - maxButtons + 1;
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className='flex items-center justify-center mt-[1rem]'>
      {currentPage > 1 && (
        <button
          onClick={goToPreviousPage}
          className='w-10 h-10 flex items-center justify-center text-blue-400 cursor-pointer duration-300 ease-in-out hover:text-blue-600'
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-10 h-10 flex items-center justify-center font-bold text-lg cursor-pointer duration-300 ease-in-out ${
            page === currentPage ? 'text-white' : 'text-blue-400 hover:text-blue-600'
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className='w-10 h-10 flex items-center justify-center text-blue-400 cursor-pointer duration-300 ease-in-out hover:text-blue-600'
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
