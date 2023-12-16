import { useRef } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

const Calendar = (props) => {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar
  });

  let ref = useRef(null);
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
    ref 
  );

  return (
    <div {...calendarProps} ref={ref} className="z-50 inline-block fixed r-5px t-80px w-390px h-345px z-1000 ">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
        {/* <CalendarGrid state={state} offset={{ months: 1 }} /> */}
      </div>
    </div>
  );
}


export default Calendar
