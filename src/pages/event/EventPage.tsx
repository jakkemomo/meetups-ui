import {useGetEventQuery, useGetEventsQuery} from '@/entities/event/api/eventApi';
import {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  CreatorDetails,
  EventDescription,
  EventHeader,
  EventLoader,
  Location,
  ReviewsRow,
  TagRow
} from '@/widgets/eventPage';
import {EventsList} from '@/widgets/EventsList';
import {useMyDetailsQuery} from '@/entities/profile/api/profileApi';
import {isFavoriteSetted, isParticipantSetted} from '@/entities/event/model/eventInfoSlice.ts';
import {useAppDispatch, useAppSelector} from '@/shared/model';
import {EventPageContext} from './model/EventPageContext';
import {mockReviews} from './model/consts';
import {useGetReviewsQuery} from '@/entities/review/api/reviewApi';
import { ParticipantsPopup } from '@/entities/eventParticipants';
import { SliderEmptyElem } from '@/shared';
import { useLogServerError } from '@/shared/lib/hooks';
import { getEventsCards } from '@/widgets/EventsList/model/getEventsCards';

export function EventPage(): ReactElement {
  const [isPageReady, setIsPageReady] = useState(false);
  const dispatch = useAppDispatch();
  const [isParticipantPopupOpen, setIsParticipantPopupOpen] = useState(false);
  const { eventId } = useParams<{eventId: string}>();
  const { isAuthorized } = useAppSelector((state) => state.session);

  const {
    data: profile
  } = useMyDetailsQuery(undefined, { skip: !isAuthorized });

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
    error: eventError,
    isSuccess: isEventSuccess,
    refetch
  } = useGetEventQuery(Number(eventId));

  const {
    data: topEvents = {results: []},
    isLoading: isTopEventsLoading,
    isError: isTopEventsError,
    error: topEventsError
  } = useGetEventsQuery({ ordering: '-average_rating' });

  const {
    error: reviewsError,
    isLoading: isReviwesLoading,
    isError: isReviewsError
  } = useGetReviewsQuery(Number(eventId));

  useLogServerError(isTopEventsError, 'ивентов', topEventsError);
  useLogServerError(isReviewsError, 'отзывов', reviewsError);

  const isOwner = event?.created_by.id === profile?.id;
  const { isFavorite } = useAppSelector((state) => state.eventInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPageReady(false);

    refetch()
      .unwrap()
      .then((res) => {
        dispatch(isFavoriteSetted(res.is_favorite));
        dispatch(isParticipantSetted(res.is_participant));
        setIsPageReady(true);
      })
      .catch((err) => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const filteredEvents = topEvents.results.filter((el) => el.id !== event?.id);
  const topEventsList = getEventsCards(filteredEvents, 'lg');

  if (isEventLoading || isReviwesLoading || !isPageReady) {
    return <EventLoader />;
  }

  if (isEventError) {
    if ('status' in eventError) {
      const errMsg = 'error' in eventError ? eventError.error : JSON.stringify(eventError.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      return <div>{eventError.message}</div>
    }
  }

  if (isEventSuccess) {
    return (
      <EventPageContext.Provider value={{ isOwner, isFavorite }}>
        <main className="bg-white w-full flex flex-col pt-[60px] pb-[66px]">
          <ParticipantsPopup
            owner={event.created_by}
            eventId={event.id}
            isOpen={isParticipantPopupOpen}
            handleClose={() => setIsParticipantPopupOpen(false)}
          />
          <EventHeader event={event} handleOpenParticipantsPopup={() => setIsParticipantPopupOpen(true)} />
          <TagRow tags={event.tags}/>
          <EventDescription event={event}/>
          <CreatorDetails creator={event.created_by}/>
          <Location event={event}/>
          <ReviewsRow reviews={mockReviews} rating={event.average_rating}/>
          <EventsList
            listTitle="Рекомендации для Вас"
            isLoading={isTopEventsLoading}
            extraClasses="mt-[50px]"
            slidesLength={4}
            arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
            emptyElement={<SliderEmptyElem text="Не найдено" />}
          >{topEventsList}</EventsList>
        </main>
      </EventPageContext.Provider>
    )
  }

  return <div>Event not found</div>;
}
