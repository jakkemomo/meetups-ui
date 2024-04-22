import { ReactElement } from "react";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";

export function ProfileInfo(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();
  const interstsList = profileData?.category_favorite.map(({ name }, id) => (
    <p className="flex flex-nowrap mr-[22px] text-indigo-600 text-lg font-semibold font-['Mulish']" key={id}>
      {" "}
      {name}{" "}
    </p>
  ));

  return (
    <section className="flex-auto flex flex-col basis-5/12 min-h-[1000px] ">
      <img
        className="w-[270px] h-[270px] bg-neutral-800 bg-opacity-40 rounded-[200px] mt-[56px]"
        src={`https://storage.googleapis.com/meetups-dev/media/${profileData?.image}`}
        alt={`Аватар пользователя ${profileData?.username}`}
      />
      <p className="text-zinc-800 font-semibold text-[32px] font-['Mulish'] mt-[20px]">
        {profileData?.firstName} &nbsp; {profileData?.lastName}
      </p>
      <p className="text-zinc-800 text-2xl font-semibold font-['Mulish'] mt-[30px]">
        О себе
      </p>
      <p className="max-w-[414px] max-h-[225px] text-zinc-800 text-lg font-normal font-['Mulish'] text-pretty text-ellipsis overflow-hidden mt-[12px]">
        {profileData?.bio}
      </p>
      <p className="text-zinc-800 text-2xl font-semibold font-['Mulish'] mt-[30px]">
        Интересы
      </p>
      <div className="flex flex-row-revers max-w-[414px] max-h-[115px] text-pretty text-ellipsis overflow-hidden mt-[14px]">
        {interstsList}
      </div>
    </section>
  );
}
