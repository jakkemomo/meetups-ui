import {useGetEventsQuery} from '@/entities/event/api/eventApi';
import {DateSlider} from '@/features/calendarFilter';
import { useGetCategoriesQuery } from '@/features/searchFilter/api/categoriesApi';
import { FilterPopup } from '@/features/searchFilter/ui/FilterPopup';
import {HomePageTitle} from '@/features/townFilter';
import { SliderEmptyElem } from '@/shared';
import { useLogServerError } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/model';
import { EventsList } from '@/widgets/EventsList';
import { getEventsCards } from '@/widgets/EventsList/model/getEventsCards';
import { MapWidget } from '@/widgets/mapWidget';
import { useGetMarkersQuery } from '@/widgets/mapWidget/api/markersApi';
import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  const { search, checkedCategories, selectedDate, endDate, startDate } = useAppSelector(state => state.searchFilter);

  const category_in = checkedCategories.join(',');

  const {
    data: events = {results: []},
    isLoading: isEventsLoading,
    isFetching: isEventsFetching,
    isError: isEventsError,
    error: eventsError
  } = useGetEventsQuery({ search, start_date: selectedDate, start_date_gte: startDate, start_date_lte: endDate, category_in, ordering: 'start_date' });

  const {
    data: topEvents = {results: []},
    isLoading: isTopEventsLoading,
    isError: isTopEventsError,
    error: topEventsError
  } = useGetEventsQuery({ ordering: '-average_rating' });

  const {
    data: categories = {results: []},
    isError: isCategoriesError,
    error: categoriesError
  } = useGetCategoriesQuery();

  const {
    data: markers = {features: []},
    isLoading: isMarkersLoading,
    isError: isMarkersError,
    error: markersError
  } = useGetMarkersQuery();

  useLogServerError(isMarkersError, 'mapMarkers', markersError);
  useLogServerError(isEventsError, 'ивентов', eventsError);
  useLogServerError(isTopEventsError, 'лучших ивентов', topEventsError);
  useLogServerError(isCategoriesError, 'категорий', categoriesError);

  const eventsList = getEventsCards(events.results, 'lg');
  const topEventsList = getEventsCards(topEvents.results, 'lg');

  return (
    <main className="w-full pb-[174px]">
      <FilterPopup categories={categories.results}/>
      <HomePageTitle />
      <DateSlider isLoading={isEventsLoading} isFetching={isEventsFetching}/>
      <EventsList
        listTitle="Ближайшие"
        isLoading={isEventsLoading}
        extraClasses="mt-14 mb-[50px]"
        slidesLength={4}
        arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
        emptyElement={<SliderEmptyElem text="Не найдено" />}
      >{eventsList}</EventsList>
      <MapWidget position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markers={markers.features} isLoading={isMarkersLoading} />
      <EventsList
        listTitle="Рекомендации для Вас"
        isLoading={isTopEventsLoading}
        extraClasses="mt-[50px]"
        slidesLength={4}
        arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
        emptyElement={<SliderEmptyElem text="Не найдено" />}
      >{topEventsList}</EventsList>
      <EventsList
        listTitle="Топ мероприятий"
        isLoading={isTopEventsLoading}
        extraClasses="mt-[50px]"
        slidesLength={4}
        arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
        emptyElement={<SliderEmptyElem text="Не найдено" />}
      >{topEventsList}</EventsList>
    </main>
  );
}
 