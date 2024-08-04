import { useGetUserCreatedEventsQuery } from "@/entities/event/api/eventApi";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
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
    data: userInfo,
    isSuccess: isUserInfoSuccess
  } = useMyDetailsQuery();

  const {
    data: closeEvents = {results: []},
    isLoading: isCloseEventsLoading,
    isError: isCloseEventsError,
    error: closeEventsError
  } = useGetUserCreatedEventsQuery({
    user_id: userInfo?.id,
    start_date_gte: dayjs().format('YYYY-MM-DD'),
    search: debounedInputValue || undefined
  }, {
    skip: !isUserInfoSuccess
  });

  const {
    data: pastEvents = {results: []},
    isLoading: isPastEventsLoading,
    isError: isPastEventsError,
    error: pastEventsError
  } = useGetUserCreatedEventsQuery({
    user_id: userInfo?.id,
    start_date_lte: dayjs().format('YYYY-MM-DD'),
    search: debounedInputValue || undefined
  }, {
    skip: !isUserInfoSuccess
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
        isError={isCloseEventsError}
        slidesLength={4}
        arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
        emptyElement={<SliderEmptyElem text="Не найдено" />}
      >{closeEventsList}</EventsList>
        <EventsList
          listTitle="Прошедшие"
          extraClasses="mt-[50px]"
          isLoading={isPastEventsLoading}
          isError={isPastEventsError}
          slidesLength={4}
          arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
          emptyElement={<SliderEmptyElem text="Не найдено" />}
        >{pastEventsList}</EventsList>
    </section>
  )
}
