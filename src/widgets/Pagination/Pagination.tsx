import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }: PaginationProps): React.ReactElement => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`text-[#5E5CCE] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Назад
      </button>
      <span>{`${endItem} из ${totalItems}`}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`text-[#5E5CCE] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;