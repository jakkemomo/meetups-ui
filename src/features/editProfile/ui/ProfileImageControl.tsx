import { ReactElement } from "react";
import { FileInputWithDrag } from "@/shared";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";
import { ProfileAvatar } from "@/widgets/Profile/ProfileInfo";
import { editProfileAvatarClass } from "../model/constants";

interface IProfileImageControlProps {
  name?: string;
  avatar: string;
  error?: string;
  value?: string;
  onChange?: (image_url: string) => void;
}

export function ProfileImageControl({
  name,
  avatar,
  error,
  value,
  onChange,
}: IProfileImageControlProps): ReactElement {
  const { onUploadImage } = useUploadImage();

  const onUploadMainImage = (file: File) => {
    onUploadImage(file, (res) => {
      onChange && onChange(res.url);
    });
  };

  return (
    <>
      <FileInputWithDrag uploadImageFunc={onUploadMainImage} error={error}>
        <ProfileAvatar
          image={value ? value : avatar}
          name={name ?? ""}
          extraClass={editProfileAvatarClass}
        />
      </FileInputWithDrag>
      {error && (
        <p
          className={
            "text-input-error max-w-[460px] ml-[22px] mt-2.5 leading-[20px]"
          }
        >
          {error}
        </p>
      )}
    </>
  );
}
