import { ReactElement } from "react";
import FollowingSection from "../../../features/subscription/ui/FollowingSection";
import { useGetFollowingQuery, useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { useAppSelector } from "@/shared/model";

function FollowingList(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();
  
  const { username } = useAppSelector(state => state.searchUsers);

  const { data: followings = [], isLoading } = useGetFollowingQuery(
    { userId: String(profileData?.id), username: username },
    { skip: !profileData }
  );

  const searchLabel = username ? 'Результаты поиска' : 'Всего';

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
