// FollowingList.tsx
import { ReactElement } from 'react';
import FollowingSection from '../../../features/subscription/ui/FollowingSection';
import { useGetFollowersQuery, useMyDetailsQuery } from '@/entities/profile/api/profileApi';
import { mockFollowings } from '@/features/subscription/model/constants';
import { useAppSelector } from "@/shared/model";

function FollowingList(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();
  const { data: followings = [], isLoading, isError, error } = useGetFollowersQuery({
    userId: String(profileData?.id),
  });

  const searchValue = useAppSelector(state => state.searchUsers.search);

  // Если значение searchValue пустое, показываем все followings, иначе - отфильтрованные
  const displayedFollowings = searchValue
    ? followings.filter(following =>
        following?.username?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : followings;

  return (
    <section className="flex flex-col mt-5 mb-10">
      <p className="text-[#9E9E9E]">Всего: {displayedFollowings.length + mockFollowings.length}</p>
        <div className="flex gap-40">
          <FollowingSection title="Люди" items={displayedFollowings} isLoading = {isLoading}/>
          <FollowingSection title="Организации" items={[]} isLoading = {isLoading}/>
        </div>
    </section>
  );
}

export default FollowingList;
