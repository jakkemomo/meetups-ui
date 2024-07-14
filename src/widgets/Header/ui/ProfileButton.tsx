import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Menu } from "@headlessui/react";
import { BurgerMenu } from "@/features/burgerMenu";
import { Fragment } from "react";

export function ProfileButton() {
  const {
    data: profileData,
    isSuccess
  } = useMyDetailsQuery();

  return (
    <Menu as={Fragment}>
      <div className="relative shrink-0">
        <Menu.Button className="text-base ml-5 outline-none">
          {isSuccess && (
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={`https://storage.googleapis.com/meetups-dev/media/${profileData.image}`}
              alt={`Аватар пользователя ${profileData.username}`}
            />
          ) }
        </Menu.Button>
        <BurgerMenu />
      </div>
    </Menu>
  );
}
