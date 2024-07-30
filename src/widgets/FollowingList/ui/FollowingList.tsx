// FollowingList.tsx
import { ReactElement, useEffect } from "react";
import FollowingSection from "../../../features/subscription/ui/FollowingSection";
import { useGetFollowingQuery, useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { useAppSelector } from "@/shared/model";

function FollowingList(): ReactElement {
  const { data: profileData, refetch } = useMyDetailsQuery();
  const { search } = useAppSelector(state => state.searchUsers);

  const { data: followings = [], 
    isLoading: isLoading 
  } = useGetFollowingQuery({
    userId: String(profileData?.id),
    search: search
  },
    { skip: !profileData }
  );

  useEffect(() => {
    if (profileData) {
      console.log("Refetching with search value:", search);
      void refetch();
    }
  }, [search, profileData, refetch]);

  const searchLabel = search ? 'Результаты поиска' : 'Всего';

  return (
    <section className="flex flex-col mt-5 mb-10">
      <p className="text-[#9E9E9E]">{searchLabel}: {followings.length}</p>
      <div className="flex gap-40">
        <FollowingSection title="Люди" items={followings} isLoading={isLoading} />
        <FollowingSection title="Организации" items={[]} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default FollowingList;
