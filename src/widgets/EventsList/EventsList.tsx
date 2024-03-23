import { IEvent } from "@/entities/event/model/types";
import { EventSlider } from "@/features/eventChoice";
import { Preloader } from "@/shared/ui/Preloader";
import { ReactElement } from "react";

interface IEventList {
  listTitle: string;
  isLoading: boolean;
  data: IEvent[];
  extraClasses?: string;
}

export function EventsList({ listTitle, isLoading, data, extraClasses }: IEventList): ReactElement {
  return (
    <div className={`flex flex-col relative before:w-[198px] before:absolute before:right-[-45px] before:h-full before:bg-slider-fade-out before:z-10 ${extraClasses}`}>
      <h3 className="text-[30px] text-text-black font-semibold relative before:bg-black-right-arrow self-start before:absolute before:w-[11px] before:h-[18px] before:top-[16px] before:right-[-30px]">{listTitle}</h3>
      {
        isLoading ? (
          <Preloader />
        ) : (
          <EventSlider events={data} />
        )
      }
    </div>
  )
}
