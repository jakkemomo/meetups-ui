import { ReactElement } from "react";

interface IProfileAvatar {
  image: string;
  name: string;
  onClick?: () => void;
  extraClass?: string;
}

function ProfileAvatar({
  image,
  name,
  onClick,
  extraClass,
}: IProfileAvatar): ReactElement {

  return (
    <div
      onClick={onClick ? onClick : undefined}
      className={`flex w-[250px] h-[250px] mt-[56px] rounded-circle shadow border border-select-disable place-content-center`}>
      <div className={`relative flex w-[236px] h-[236px] bg-opacity-40 rounded-circle self-center ${extraClass ? extraClass : ""}`}>
        <img
          className="object-cover rounded-circle"
          src={`https://storage.googleapis.com/meetups-dev/media/${image}`}
          alt={`Аватар пользователя ${name}`}
        />
      </div>
    </div>
  );
}

export default ProfileAvatar;
