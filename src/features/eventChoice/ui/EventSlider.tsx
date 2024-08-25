import { SlickSlider } from "@/shared";
import { ISlickSliderProps } from "@/shared/ui/SlickSlider/SlickSlider";
import { ReactElement, useEffect, useState } from "react";

export interface IEventSlider extends Omit<ISlickSliderProps, 'extraSettings'> {
  slidesLength: number
}

export function EventSlider({ children, arrowsExtraClasses, slidesLength }: IEventSlider): ReactElement {
  const [slidesToShow, setSlidesToShow] = useState(slidesLength);
  const [sliderWidth, setSliderWidth] = useState(100);

  useEffect(() => {
    if (children.length < slidesLength) {
      setSlidesToShow(children.length);
      setSliderWidth(Math.floor(100 - ((slidesLength - children.length) * (100 / slidesLength))));
    } else {
      setSlidesToShow(slidesLength);
      setSliderWidth(100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children.length]);

  const settings = {
    slidesToShow,
    slidesToScroll: 2,
    speed: 400,
    className: `mt-2 w-full ml-[-10px] min-h-[230px]`
  }

  return (
    // Tailwind does not accept dynamic classes well, so inline-styles are used
    <div style={{ width: `${sliderWidth}%` }}>
      <SlickSlider extraSettings={settings} arrowsExtraClasses={arrowsExtraClasses}>
        {children}
      </SlickSlider>
    </div>
  )
}
