// FollowingList.tsx
import { ReactElement } from "react";
import FollowingSection from "../../../features/subscription/ui/FollowingSection";
import { useGetFollowingQuery, useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { useAppSelector } from "@/shared/model";
import { ProfileFollowing } from "@/entities/profile/model/types";

function FollowingList(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();
  const { data: followings = [], isLoading } = useGetFollowingQuery({
    userId: String(profileData?.id),
  });

  const searchValue = useAppSelector(state => state.searchUsers.search);

  // Если значение searchValue пустое, показываем все followings, иначе - отфильтрованные
  const displayedFollowings = searchValue
    ? followings.filter((following: ProfileFollowing ) =>
        following?.username?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : followings;

    const searchLabel = searchValue ? 'Результаты поиска' : 'Всего';

  return (
    <section className="flex flex-col mt-5 mb-10">
      <p className="text-[#9E9E9E]">{searchLabel}: {displayedFollowings.length}</p>
        <div className="flex gap-40">
          <FollowingSection title="Люди" items={displayedFollowings} isLoading = {isLoading}/>
          <FollowingSection title="Организации" items={[]} isLoading = {isLoading}/>
        </div>
    </section>
  );
}

export default FollowingList;

