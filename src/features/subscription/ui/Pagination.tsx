import React from 'react';
import { IPaginationProps } from '../model/types';
import Svg from '@/shared/ui/Svg';
import { ITEMS_PER_PAGE } from '../model/constants';

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }: IPaginationProps): React.ReactElement => {
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

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(startItem + ITEMS_PER_PAGE - 1, totalItems);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`text-[#5E5CCE] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Svg className={`w-6 h-6 ${currentPage === 1 ? 'hidden' : '' }`} id="previous-arrow" />
      </button>
      <span className="text-[#2E2E2E]">{`${endItem} из ${totalItems}`}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`text-[#5E5CCE] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Svg className="transform scale-x-[-1] w-6 h-6" id="previous-arrow" />
      </button>
    </div>
  );
};

export default Pagination;

