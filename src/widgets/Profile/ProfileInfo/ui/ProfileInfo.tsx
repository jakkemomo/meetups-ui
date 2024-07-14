import { ReactElement, ReactNode, useState } from "react";
import Svg from "@/shared/ui/Svg";
import { BackButton } from "@/shared/ui/Buttons/BackButton";
import ProfileAvatar from "./ProfileAvatar";
import { ProfileDetails } from "@/entities/profile/model/types";
import { Button } from "@/shared";
import { useOverflowY } from "../../../../shared/lib/hooks/useOverflowY";

export interface IProfileInfoProps {
  profileData: ProfileDetails;
  children: ReactNode;
  optionButton?: ReactNode;
}

export function ProfileInfo({
  profileData,
  children,
  optionButton,
}: IProfileInfoProps): ReactElement {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const { ref, isOverflowY } = useOverflowY();

  const interstsList = profileData.category_favorite.map(
    ({ name, image_url, id }) => (
      <div
        className="flex flex-row flex-wrap mt-[12px] cursor-pointer"
        key={id}
      >
        <img
          className="w-[24px] h-[24px] flex-nowrap"
          src={`https://storage.googleapis.com/meetups-dev/media/${image_url}`}
          alt={`иконка интереса ${name}`}
        />
        <p className="flex flex-nowrap ml-[8px] mr-[22px] text-indigo-600 text-lg font-semibold cursor-pointer">
          {name}
        </p>
      </div>
    )
  );

  return (
    <section className="flex-auto flex flex-col basis-5/12 min-h-[1027px] w-[420px] mr-[106px]">
      <ProfileAvatar image={profileData.image} name={profileData.username} />
      <p className="text-zinc-800 font-semibold text-[32px] mt-[20px]">
        {profileData.username}
      </p>
      <div className="flex flex-row mt-[10px] cursor-pointer">
        <Svg
          id="location"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        />
        <div className="text-indigo-600 text-xl font-semibold ml-[8px]">
          {profileData.city ? (
            profileData.city
          ) : (
            <p className="text-zinc-400 text-[18px]">Укажите свой город</p>
          )}
        </div>
      </div>
      <div className="mt-[30px]">{children}</div>
      <p className="text-text-black text-2xl font-semibold mt-[30px]">О себе</p>
      <div className="flex flex-col w-[420px] mt-3">
        <div
          ref={ref}
          className={`w-full text-text-black font-normal break-words whitespace-pre-wrap overflow-y-hidden ${
            isAboutOpen ? "" : "max-h-[115px]"
          }`}
        >
          <p className="w-full text-text-black text-[18px] leading-[23px]">
            {profileData.bio || "Расскажите о себе"}
          </p>
        </div>
        {isOverflowY && (
          <Button
            type="button"
            onClick={() => setIsAboutOpen((state) => !state)}
            extraClass="!text-[14px] !leading-[18px] !text-[#737373] self-end mt-[9px]"
          >
            {isAboutOpen ? "скрыть" : "читать полностью"}
            <Svg
              id="slider-chevron"
              className={`w-5 h-5 ml-1 ${
                isAboutOpen ? "rotate-[-90deg]" : "rotate-90"
              }`}
              viewBox="0 0 36 36"
            />
          </Button>
        )}
      </div>
      {interstsList?.length != 0 && (
        <>
          <p className="text-zinc-800 text-2xl font-semibold mt-[30px]">
            Интересы
          </p>
          <div className="flex flex-row-revers flex-wrap max-w-[550px] max-h-[115px] text-pretty text-ellipsis overflow-hidden">
            {interstsList}
          </div>
        </>
      )}
      {optionButton && optionButton}
      <div className="flex mt-auto">
        <BackButton />
      </div>
    </section>
  );
}
