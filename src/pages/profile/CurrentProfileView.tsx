import { ReactElement } from "react";
import { ProfileInfo, ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
import {
  useGetUserCreatedEventsQuery,
  useGetUserFinishedEventsQuery,
  useGetUserPlannedEventsQuery
} from "@/entities/event/api/eventApi";
import { EventsList } from "@/widgets/EventsList";
import { SliderEmptyElem } from "@/shared";
import { useLogServerError } from "@/shared/lib/hooks";
import { getEventsCards } from "@/widgets/EventsList/model/getEventsCards";
import { useGeocodeIdQuery } from "@/entities/geocode/api/geocodeApi";

function CurrentProfileView(): ReactElement {
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError: isProfileDataError,
    error: profileDataError,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();

  const {
    data: createdEvents = {results: []},
    isLoading: isCreatedEventsLoading,
    isError: isCreatedEventsError,
    error: createdEventsError
  } = useGetUserCreatedEventsQuery(isProfileDataSuccess ? profileData.id : 0);

  const {
    data: finishedEvents = {results: []},
    isLoading: isFinishedEventsLoading,
    isError: isFinishedEventsError,
    error: finishedEventsError
  } = useGetUserFinishedEventsQuery(isProfileDataSuccess ? profileData.id : 0);

  const {
    data: plannedEvents = {results: []},
    isLoading: isPlannedEventsLoading,
    isError: isPlannedEventsError,
    error: plannedEventsError
  } = useGetUserPlannedEventsQuery(isProfileDataSuccess ? profileData.id : 0);

  const {
    isLoading: isCityLoading,
    data: city,
    error: cityError,
    isError: isCityError
  } = useGeocodeIdQuery(
    profileData?.city_location?.place_id ?? '',
    { skip: !profileData?.city_location?.place_id }
  );

  useLogServerError(isProfileDataError, 'подписок', profileDataError);
  useLogServerError(isFinishedEventsError, 'посещенных ивентов', finishedEventsError);
  useLogServerError(isPlannedEventsError, 'запланированных ивентов', plannedEventsError);
  useLogServerError(isCreatedEventsError, 'созданных ивентов', createdEventsError);
  useLogServerError(isCityError, 'города', cityError);

  const createdEventsList = getEventsCards(createdEvents.results, 'sm');
  const finishedEventsList = getEventsCards(finishedEvents.results, 'sm');
  const plannedEventsList = getEventsCards(plannedEvents.results, 'sm');

  const onEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isProfileDataLoading || isCityLoading) {
    return (
      <div className="m-auto">
        <ProfileLoader />
      </div>
    )
  }

  if (isProfileDataSuccess) {
    return (
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px] overflow-x-hidden">
        <ProfileInfo
          profileData={profileData}
          city={city}
        >
          <Button onClick={onEditProfile} size="lg" importance="primary">
            Редактировать
          </Button>
        </ProfileInfo>
        <div className="w-[65%]">
          <EventsList
            listTitle="Созданные"
            isLoading={isCreatedEventsLoading}
            extraClasses="mt-[60px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
            emptyElement={<SliderEmptyElem text="Не создано" />}
          >{createdEventsList}</EventsList>
          <EventsList
            listTitle="Планируете посетить"
            isLoading={isPlannedEventsLoading}
            extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
            emptyElement={<SliderEmptyElem text="Не запланировано" />}
          >{plannedEventsList}</EventsList>
          <EventsList
            listTitle="Посещенные"
            isLoading={isFinishedEventsLoading}
            extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
            emptyElement={<SliderEmptyElem text="Не найдено" />}
          >{finishedEventsList}</EventsList>
        </div>
      </section>
    );
  }

  return <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>
}

export default CurrentProfileView;
