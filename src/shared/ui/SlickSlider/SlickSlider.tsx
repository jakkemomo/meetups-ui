import { ReactElement, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlickSliderArrow } from "./SlickSliderArrow";
import { ISlickSliderSettings } from "@/shared/types";

interface ISlickSliderProps {
  children: ReactElement[];
  extraSettings?: ISlickSliderSettings;
}

export function SlickSlider({ children, extraSettings }: ISlickSliderProps): ReactElement {
  const [slide, setSlide] = useState(0);

  // About Settings for react-slick: https://react-slick.neostack.com/docs/api
  const settings = {
    dots: false,
    infinite: false,
    nextArrow: <SlickSliderArrow previous={false} />,
    prevArrow: <SlickSliderArrow previous={true} slide={slide} />,
    afterChange: (current: number) => setSlide(current),
    ...extraSettings
  }

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
}
