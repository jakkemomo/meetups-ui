interface INextArrowProps {
  onClick?: () => void;
  previous: boolean;
  slide?: number;
}

export function SlickSliderArrow({ onClick, previous, slide }: INextArrowProps) {
  return (
    <div onClick={onClick} className={`absolute right-0 top-1/2 translate-y-[-50%] bg-right-arrow bg-no-repeat bg-center w-3 h-[25px] z-10 cursor-pointer ${previous ? slide ? "left-[-15px] origin-center rotate-180 block" : "left-[-15px] origin-center rotate-180 hidden" : ""}`}></div>
  )
}