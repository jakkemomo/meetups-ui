import { IDetailedEvent } from "@/entities/event/model/types";
import { ReactElement } from "react";

interface IEventDescription {
  event: IDetailedEvent;
}

export function EventDescription({event}: IEventDescription): ReactElement {
  return (
    <section className="w-full mt-[90px] self-start">
      <h2 className="text-[28px] leading-[35px] font-semibold">
        О событии
      </h2>
      <p className="text-[20px] text-text-black mt-7 whitespace-pre-wrap break-words">{event.description}</p>
    </section>
  )
}
