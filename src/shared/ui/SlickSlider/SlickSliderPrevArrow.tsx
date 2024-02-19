import { ArrowsExtraClasses } from "@/shared/types";

interface IPrevArrowProps {
  onClick?: () => void;
  slide: number;
  extraClasses: ArrowsExtraClasses;
}

export function SlickSliderPrevArrow({ onClick, slide, extraClasses }: IPrevArrowProps) {
  return (
    <div onClick={onClick} className={`absolute bg-right-arrow bg-no-repeat bg-center w-3 h-[25px] z-10 cursor-pointer origin-center rotate-180 block ${extraClasses.leftArrow} ${slide ? "" : "hidden"}`}></div>
  )
}
