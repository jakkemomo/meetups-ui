import { ReactElement, createRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowsExtraClasses, ISlickSliderSettings } from "@/shared/types";
import { SlickSliderPrevArrow } from "./SlickSliderPrevArrow";
import { SlickSliderNextArrow } from "./SlickSliderNextArrow";

interface ISlickSliderProps {
  children: ReactElement[];
  extraSettings: ISlickSliderSettings;
  arrowsExtraClasses: ArrowsExtraClasses;
}

export function SlickSlider({ children, extraSettings, arrowsExtraClasses }: ISlickSliderProps): ReactElement {
  const [slide, setSlide] = useState(0);
  const sliderRef = createRef<Slider>();

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
    setSlide(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children.length]);

  // About Settings for react-slick: https://react-slick.neostack.com/docs/api
  const settings = {
    dots: false,
    infinite: false,
    nextArrow: <SlickSliderNextArrow slide={slide} slidesToShow={extraSettings.slidesToShow} arrLength={children.length} extraClasses={arrowsExtraClasses} />,
    prevArrow: <SlickSliderPrevArrow slide={slide} extraClasses={arrowsExtraClasses} />,
    afterChange: (current: number) => setSlide(current),
    ...extraSettings
  }

  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
}
