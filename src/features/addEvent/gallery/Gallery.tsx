import { FileInputWithDrag } from "@/shared";
import { ReactElement, useId } from "react";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";

interface IGalleryProps {
  onChange: (image_url: string) => void;
  value: string[];
}

export function Gallery({ onChange, value }: IGalleryProps): ReactElement {
  const uploadInputId = useId();
  const { onUploadImage } = useUploadImage();

  const onUploadImageInGallery = (file: File) => {
    onUploadImage(file, (res) => {
      onChange(res.url);
    })
  }

  return (
    <>
      <label htmlFor={uploadInputId} className="text-[20px] mt-[18px] cursor-pointer">Галерея фото и видео (необязательно)</label>
      <FileInputWithDrag uploadImageFunc={onUploadImageInGallery} id={uploadInputId} extraClass="min-h-[80px] px-[22px] mt-[7px]">
        {
          value.length > 0 ? (
            <div className="flex items-center flex-wrap py-1.5">
              <div className="w-6 h-6 bg-plus-icon bg-center bg-no-repeat mr-3.5"></div>
              {
                value.map((el, index) => <img key={index} src={`https://storage.googleapis.com/meetups-dev/media/${el}`} className="w-[68px] h-[68px] rounded-[10px] object-cover mr-1.5" alt="Ваше загруженное изображение" />)
              }
            </div>
          ) : (
            <div className="flex items-end py-[13px]">
              <div className="w-6 h-6 bg-gallery-icon bg-center bg-no-repeat"></div>
              <p className="text-secondary-600 text-[18px] leading-[22.59px] ml-[12px]">Загрузите дополнительные материалы</p>
            </div>
          )
        }
      </FileInputWithDrag>
    </>
  )
}
