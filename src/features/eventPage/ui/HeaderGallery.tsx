import { ReactElement } from "react";
import { config } from "@/shared/config";
import { IDetailedEvent } from "@/entities/event/model/types";
import { SlickSlider } from "@/shared";

interface IGallery {
  event: IDetailedEvent;
}

export function HeaderGallery({ event }: IGallery): ReactElement {
  const imgsArr = [event.image_url, ...event.gallery];

  const imgs = imgsArr.map((el, index) => <img key={index} className="rounded-r-[15px] h-[460px] object-cover" src={`${config.BASE_IMAGE_URL}${el}`} alt={`Изображение ивента номер ${index}`} />);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 400,
    className: 'rounded-r-[15px] h-full'
  }

  return (
    <div className="h-full rounded-r-[15px] shrink-0 w-[690px]">
      {
        imgsArr.length > 1 ? (
          <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-[-40px] top-1/2 translate-y-[-50%]', leftArrow: 'left-[-40px] top-1/2 translate-y-[-50%]'}}>
            {imgs}
          </SlickSlider>
        ) : (
          <img src={`${config.BASE_IMAGE_URL}${event.image_url}`} alt="Изображение ивента" className="object-cover object-center w-full h-full rounded-r-[10px]"/>
        )
      }
    </div>
  )
}
