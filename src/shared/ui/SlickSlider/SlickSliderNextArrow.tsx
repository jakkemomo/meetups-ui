import { ArrowsExtraClasses } from "@/shared/types";

interface INextArrowProps {
  onClick?: () => void;
  slide: number;
  slidesToShow: number;
  arrLength: number;
  extraClasses: ArrowsExtraClasses;
}

export function SlickSliderNextArrow({ onClick, slide, slidesToShow, arrLength, extraClasses }: INextArrowProps) {
  return (
    <div onClick={onClick} className={`absolute bg-right-arrow bg-no-repeat bg-center w-3 h-[25px] z-10 cursor-pointer ${extraClasses.rightArrow} ${slidesToShow + slide >= arrLength ? "hidden" : ""}`}></div>
  )
}
