import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import {DateSlider} from '@/features/calendarFilter';
import { MapWidget } from '@/features/mapWidget';
import { useGetCategoriesQuery } from '@/features/searchFilter/api/categoriesApi';
import { FilterPopup } from '@/features/searchFilter/ui/FilterPopup';
import {HomePageTitle} from '@/features/townFilter';
import { useAppSelector } from '@/shared/model';
import { Popup } from '@/shared/ui/Popup';
import { EventsList } from '@/widgets/EventsList';
import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  const { search } = useAppSelector(state => state.searchFilter);
  const { isOpen } = useAppSelector((state) => state.filterPopup);
  const { data: events = {results: []}, isLoading, isError, error } = useGetEventsQuery({ search: search });
  const { data: categories = {results: []}, isError: isCategoriesError, error: categoriesError } = useGetCategoriesQuery();

  isError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(error)}`);
  isCategoriesError && console.log(`Ошибка при получении категорий - ${JSON.stringify(categoriesError)}`);

  return (
    <main className="w-full">
      {
        isOpen && <Popup><FilterPopup categories={categories.results}/></Popup>
      }
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isLoading} data={events.results} extraClasses="mt-14" />
      <MapWidget />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
    </main>
  );
}
