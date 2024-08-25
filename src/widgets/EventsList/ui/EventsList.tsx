import { EventSlider } from "@/features/eventChoice";
import { ReactElement, ReactNode } from "react";
import { IEventSlider } from "@/features/eventChoice/ui/EventSlider";
import { EventSkeleton } from "./EventSkeleton";

interface IEventList extends Omit<IEventSlider, 'slidesToShow'> {
  listTitle: string;
  isLoading: boolean;
  extraClasses?: string;
  emptyElement: ReactNode;
  isError?: boolean;
  errorElement?: ReactNode;
}

export function EventsList({
  listTitle,
  isLoading,
  children,
  extraClasses,
  arrowsExtraClasses,
  emptyElement,
  isError,
  slidesLength,
  errorElement = <p>Произошла ошибка на сервере, попробуйте перезагрузить страницу</p>
}: IEventList): ReactElement {
  return (
    <div className={`flex flex-col relative w-full ${children.length > slidesLength ? "before:w-[198px] before:absolute before:right-[-45px] before:h-full before:bg-slider-fade-out before:z-10 before:pointer-events-none" : ""} ${extraClasses ?? ""}`}>
      <h3 className="text-[30px] leading-[35px] text-text-black font-semibold relative before:bg-black-right-arrow self-start before:absolute before:w-[11px] before:h-[18px] before:top-2.5 before:right-[-30px]">{listTitle}</h3>
      {
        isLoading ? (
          <div className="w-full h-[276px] flex gap-[45px]">
            {
              Array.from({ length: 4 }).map((_, index) => <EventSkeleton key={index} />)
            }
          </div>
        ) : isError ? (
          errorElement
        ) : children.length === 0 ? (
          emptyElement
        ) : (
          <EventSlider
            arrowsExtraClasses={arrowsExtraClasses}
            slidesLength={slidesLength}
          >{children}</EventSlider>
        )
      }
    </div>
  )
}
