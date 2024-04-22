import { ReactElement } from "react";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import Svg from "@/shared/ui/Svg";
import { BackButton } from "@/shared/ui/Buttons/BackButton";

export function ProfileInfo(): ReactElement {
  const { data: profileData } = useMyDetailsQuery();
  const interstsList = profileData?.category_favorite.map(({ name }, id) => (
    <p
      className="flex flex-nowrap mr-[22px] text-indigo-600 text-lg font-semibold cursor-pointer"
      key={id}
    >
      {" "}
      {name}{" "}
    </p>
  ));

  return (
    <section className="flex-auto flex flex-col basis-5/12 min-h-[1000px]">
      <div className="cursor-pointer w-[270px] h-[270px] mt-[56px] rounded-[200px] bg-neutral-800 bg-edit-photo bg-no-repeat bg-center">
        <img
          className="bg-neutral-800 bg-opacity-40 rounded-[200px] hover:opacity-60"
          src={`https://storage.googleapis.com/meetups-dev/media/${profileData?.image}`}
          alt={`Аватар пользователя ${profileData?.username}`}
        />
      </div>
      <p className="text-zinc-800 font-semibold text-[32px] mt-[20px]">
        {profileData?.firstName} &nbsp; {profileData?.lastName}
      </p>
      <div className="flex flex-row mt-[10px] cursor-pointer">
        <Svg
          id="location"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        />
        <p className="text-indigo-600 text-xl font-semibold ml-[8px]">
          {profileData?.city}
        </p>
      </div>
      <div className="mt-[30px]">
        <Button size="lg" importance="primary">
          Редактировать
        </Button>
      </div>

      <p className="text-zinc-800 text-2xl font-semibold mt-[30px]">О себе</p>
      <p className="max-w-[414px] max-h-[115px] text-zinc-800 text-lg font-normal text-pretty text-ellipsis overflow-hidden mt-[12px]">
        {profileData?.bio}
      </p>
      <p className="text-zinc-800 text-2xl font-semibold mt-[30px]">Интересы</p>
      <div className="flex flex-row-revers max-w-[414px] max-h-[115px] text-pretty text-ellipsis overflow-hidden mt-[14px]">
        {interstsList}
      </div>
      <div className="flex mt-auto ">
        <BackButton />
      </div>
    </section>
  );
}
