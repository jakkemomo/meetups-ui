import { useGetEventsQuery } from "@/entities/event/api/eventApi";
import { SliderEmptyElem } from "@/shared";
import { useLogServerError } from "@/shared/lib/hooks";
import { EventsList } from "@/widgets/EventsList";
import { getEventsCards } from "@/widgets/EventsList/model/getEventsCards";
import dayjs from 'dayjs';

interface ICreatedEventsProps {
  debounedInputValue: string;
}

export function CreatedEvents({ debounedInputValue }: ICreatedEventsProps) {
  const {
    data: closeEvents = {results: []},
    isLoading: isCloseEventsLoading,
    isError: isCloseEventsError,
    error: closeEventsError
  } = useGetEventsQuery({
    start_date_gte: dayjs().format('YYYY-MM-DD'),
    search: debounedInputValue || undefined
  });

  const {
    data: pastEvents = {results: []},
    isLoading: isPastEventsLoading,
    isError: isPastEventsError,
    error: pastEventsError
  } = useGetEventsQuery({
    start_date_lte: dayjs().format('YYYY-MM-DD'),
    search: debounedInputValue || undefined
  });

  useLogServerError(isCloseEventsError, 'ближайших ивентов', closeEventsError);
  useLogServerError(isPastEventsError, 'прошедших ивентов', pastEventsError);

  const closeEventsList = getEventsCards(closeEvents.results, 'lg');
  const pastEventsList = getEventsCards(pastEvents.results, 'lg');

  return (
    <section className="flex w-full flex-wrap">
      <EventsList
        listTitle="Ближайшие"
        isLoading={isCloseEventsLoading}
        slidesLength={4}
        arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
        emptyElement={<SliderEmptyElem text="Не найдено" />}
      >{closeEventsList}</EventsList>
        <EventsList
          listTitle="Прошедшие"
          extraClasses="mt-[50px]"
          isLoading={isPastEventsLoading}
          slidesLength={4}
          arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
          emptyElement={<SliderEmptyElem text="Не найдено" />}
        >{pastEventsList}</EventsList>
    </section>
  )
}
