import { ReactElement, useState } from 'react';
import FollowingItem from './FollowingItem';
import { Pagination } from '../../Pagination/index';
import { IFollowing } from '@/features/subscription/model/types';

interface FollowingSectionProps {
  title: string;
  items: IFollowing[];
}

const ITEMS_PER_PAGE = 5;

function FollowingSection({ title, items }: FollowingSectionProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-[#5E5CCE] text-[22px] font-medium">{title}</h2>
      <ul>
        {currentItems.map((following: IFollowing) => (
          <li key={following.id}>
            <FollowingItem following={following} />
          </li>
        ))}
      </ul>
      {items.length > 6 && 
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={items.length}
            onPageChange={handlePageChange}
        />
      }
    </div>
  );
}

export default FollowingSection;