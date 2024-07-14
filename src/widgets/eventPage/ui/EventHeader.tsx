import { IDetailedEvent } from "@/entities/event/model/types";
import { HeaderDetails, HeaderGallery } from "@/features/eventPage";
import { ReactElement } from "react";


interface IEventHeader {
  event: IDetailedEvent;
  handleOpenParticipantsPopup: () => void;
}

export function EventHeader({ event, handleOpenParticipantsPopup }: IEventHeader): ReactElement {
  return (
    <section className="flex w-full h-[460px] rounded-[15px] shadow">
      <HeaderDetails event={event} handleOpenParticipantsPopup={handleOpenParticipantsPopup} />
      <HeaderGallery event={event} />
    </section>
  )
}
