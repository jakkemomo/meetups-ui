import { ReactElement } from "react";
import addImageIcon from '/images/add-image-icon.svg';
import { FileInputWithDrag } from "@/shared";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";

interface IMainImageControlProps {
  error?: string;
  value?: string;
  onChange?: (image_url: string) => void;
}

export function MainImageControl({ error, value, onChange }: IMainImageControlProps): ReactElement {
  const { onUploadImage } = useUploadImage();

  const onUploadMainImage = (file: File) => {
    onUploadImage(file, (res) => {
      onChange && onChange(res.url);
    })
  }

  return (
    <div className="relative self-end">
      <FileInputWithDrag
        uploadImageFunc={onUploadMainImage}
        error={error}
        extraClass="h-[170px] w-[270px] flex flex-col items-center justify-center"
      >
        {
          value ? (
            <img className="object-contain" src={`https://storage.googleapis.com/meetups-dev/media/${value}`} alt="Ваше загруженное изображение" />
          ) : (
            <>
              <img className="mt-[45px]" src={addImageIcon} alt="Поле для загрузки фото" />
              <p className="text-[18px] font-light text-text-light-gray mt-5 mb-[22px] whitespace-nowrap leading-[22.59px]">Загрузите главное фото</p>
            </>
          )
        }
      </FileInputWithDrag>
      {error && <p className={"text-input-error max-w-[460px] ml-[22px] mt-2.5 leading-[20px]"}>{error}</p>}
    </div>
  )
}
