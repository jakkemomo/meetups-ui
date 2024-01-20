import EventList from "./EventList.tsx";
import {mockEventList} from "../api/mocks/constants.ts";
import {ReactElement} from "react";

function EventsSection(): ReactElement {

  return (
    <section className='flex flex-col pl-20 pt-80 pb-4 pr-5 gap-14 absolute bottom-0 left-0 bg-gradient-to-r from-neutral-950 from-80% w-860'>
      <EventList events={mockEventList}/>
    </section>
  )
}

export default EventsSection;
