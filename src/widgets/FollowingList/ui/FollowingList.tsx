import { ReactElement } from 'react';
import FollowingSection from '../../../features/subscription/ui/FollowingSection';
import { useGetFollowersQuery, useGetFollowingQuery, useMyDetailsQuery } from '@/entities/profile/api/profileApi';
import { mockFollowings } from '@/features/subscription/model/constants';


function FollowingList(): ReactElement {
  const {
    data: profileData,
  } = useMyDetailsQuery();

  const {
    data: followings,
    isLoading: isFollowingsLoading,
    isError: isFollowingsError,
    error: followingsError
  } = useGetFollowersQuery({
    userId: String(profileData?.id),
  });
  
  return (
    <section className="flex flex-col mt-5 mb-10">
      <p className="text-[#9E9E9E]">Всего: {followings?.length + mockFollowings.length}</p>
      {followings && 
       <div className="flex gap-40">
          <FollowingSection title="Люди" items={followings}/>
          <FollowingSection title="Организации" items={mockFollowings} />
       </div>
      }
    </section>
    );
}

export default FollowingList;

  
