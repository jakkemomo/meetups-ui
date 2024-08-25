import { EventCard } from "@/entities/event";
import { useGetUserFavotireEventsQuery, useGetUserPlannedEventsQuery } from "@/entities/event/api/eventApi";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { useLogServerError } from "@/shared/lib/hooks";
import { EventSkeleton } from "@/widgets/EventsList/ui/EventSkeleton";
import { textAccordingType } from "../model/constants";

interface IEventsConteinerProps {
  debounedInputValue: string;
  type: 'favorite' | 'planned';
}

export function EventsContainer({ debounedInputValue, type }: IEventsConteinerProps) {
  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess
  } = useMyDetailsQuery();

  const {
    data: favoriteEvents = { results: [] },
    isSuccess: isFavoriteEventsSuccess,
    isLoading: isFavoriteEventsLoading,
    isError: isFavoriteEventsError,
    error: favoriteEventsError
  } = useGetUserFavotireEventsQuery({
    user_id: userInfo?.id ?? 0,
    search: debounedInputValue || undefined
  }, {
    skip: !isUserInfoSuccess || type === 'planned'
  });

  const {
    data: plannedEvents = { results: [] },
    isSuccess: isPlannedEventsSuccess,
    isLoading: isPlannedEventsLoading,
    isError: isPlannedEventsError,
    error: plannedEventsError
  } = useGetUserPlannedEventsQuery({
    user_id: userInfo?.id ?? 0,
    search: debounedInputValue || undefined
  }, {
    skip: !isUserInfoSuccess || type === 'favorite'
  });

  useLogServerError(isFavoriteEventsError, 'избранных ивентов', favoriteEventsError);
  useLogServerError(isPlannedEventsError, 'запланированных ивентов', plannedEventsError);

  const isLoading = isPlannedEventsLoading || isFavoriteEventsLoading;
  const isSuccess = isPlannedEventsSuccess || isFavoriteEventsSuccess;
  const isError = isFavoriteEventsError || isPlannedEventsError;

  const events = type === 'favorite' ? favoriteEvents : plannedEvents;

  return (
    <section className="flex w-full flex-wrap gap-x-[45px] gap-y-10">
      {
        isLoading ? (
          <>
            <div className="w-full h-[276px] flex gap-[45px]">
              {
                Array.from({ length: 4 }).map((_, index) => <EventSkeleton key={index} />)
              }
            </div>
            <div className="w-full h-[276px] flex gap-[45px]">
              {
                Array.from({ length: 4 }).map((_, index) => <EventSkeleton key={index} />)
              }
            </div>
          </>
        ) : isError ? (
          <p>Ошибка на сервере, попробуйте перезагрузить страницу</p>
        ) : events.results.length === 0 ? (
          <p>{`У вас нет ${textAccordingType.find((el) => el.type === type)?.placeholder} ивентов`}</p>
        ) : isSuccess ? (
          events.results?.map((event) => <EventCard key={event.id} event={event} extraCardClass="!mx-0" />)
        ) : (<></>)
      }
    </section>
  )
}
