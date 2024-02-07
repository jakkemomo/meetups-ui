import { ArrowsExtraClasses } from "@/shared/types";

interface INextArrowProps {
  onClick?: () => void;
  previous: boolean;
  slide?: number;
  extraClasses: ArrowsExtraClasses;
}

export function SlickSliderArrow({ onClick, previous, slide, extraClasses }: INextArrowProps) {
  return (
    <div onClick={onClick} className={`absolute bg-right-arrow bg-no-repeat bg-center w-3 h-[25px] z-10 cursor-pointer ${extraClasses.rightArrow} ${previous ? slide ? `origin-center rotate-180 block ${extraClasses.leftArrow}` : "hidden" : ""}`}></div>
  )
}
