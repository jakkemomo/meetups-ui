import { ReactElement, useState } from 'react';
import FollowingItem from './FollowingItem';
import FollowingItemSkeleton from './FollowingSkeleton';
import Pagination from './Pagination';
import { ProfileFollowing } from '@/entities/profile/model/types';

interface FollowingSectionProps {
  title: string;
  items: ProfileFollowing[];
  isLoading: boolean
}

const ITEMS_PER_PAGE = 6;

function FollowingSection({ title, items, isLoading }: FollowingSectionProps): ReactElement {
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
      {isLoading ? (
        <ul className='mt-4 flex flex-col gap-4'>
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <li key={index}>
              <FollowingItemSkeleton />
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <p className="text-gray-500 pb-10 pt-10">Не найдено</p>
      ) : (
        <>
          <ul className='mt-4 flex flex-col gap-4'>
            {currentItems.map((following: ProfileFollowing) => (
              <li key={following.user}>
                <FollowingItem following={following} />
              </li>
            ))}
          </ul>
          {items.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={items.length}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FollowingSection;
