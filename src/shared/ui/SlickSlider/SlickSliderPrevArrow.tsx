import { ArrowsExtraClasses } from "@/shared/types";
import Svg from "../Svg";

interface IPrevArrowProps {
  onClick?: () => void;
  slide: number;
  extraClasses: ArrowsExtraClasses;
}

export function SlickSliderPrevArrow({ onClick, slide, extraClasses }: IPrevArrowProps) {
  return (
    <Svg onClick={onClick} id="slider-chevron" className={`absolute w-9 h-9 z-10 cursor-pointer origin-center rotate-180 block ${extraClasses.leftArrow} ${slide ? "" : "hidden"}`}/>
  )
}
