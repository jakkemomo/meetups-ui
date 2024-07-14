import { ArrowsExtraClasses } from "@/shared/types";
import Svg from "../Svg";

interface INextArrowProps {
  onClick?: () => void;
  slide: number;
  slidesToShow: number;
  arrLength: number;
  extraClasses: ArrowsExtraClasses;
}

export function SlickSliderNextArrow({ onClick, slide, slidesToShow, arrLength, extraClasses }: INextArrowProps) {
  return (
    <Svg onClick={onClick} id="slider-chevron" className={`absolute w-9 h-9 z-10 cursor-pointer ${extraClasses.rightArrow} ${slidesToShow + slide >= arrLength ? "hidden" : ""}`}/>
  )
}
