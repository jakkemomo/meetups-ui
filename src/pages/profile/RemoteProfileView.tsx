import { useLayoutEffect, useState } from "react";
import { ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useGetFollowingQuery,
  useFollowMutation,
  useUnFollowMutation,
} from "@/entities/profile/api/profileApi";
import { ProfileInfo, ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { Button } from "@/shared/ui/Buttons/Button";
import { ProfileFollowButton } from "@/widgets/ProfileButton";
import { IFollowStatus } from "@/entities/profile/model/types";
import {
  useGetUserCreatedEventsQuery,
  useGetUserFinishedEventsQuery,
  useGetUserPlannedEventsQuery
} from "@/entities/event/api/eventApi";
import { EventsList } from "@/widgets/EventsList";
import { SliderEmptyElem } from "@/shared";
import { getEventsCards } from "@/widgets/EventsList/model/getEventsCards";
import { useLogServerError } from "@/shared/lib/hooks";
import { PrivateUserEventsCap } from "@/widgets/Profile/PrivateUserEventsCap";

function RemoteProfileView(): ReactElement {
  const navigate = useNavigate();
  const { userId = "0" } = useParams();
  const [followStatus, setFollowStatus] = useState<IFollowStatus>(undefined);

  const {
    data: createdEvents = {results: []},
    isLoading: isCreatedEventsLoading,
    isError: isCreatedEventsError,
    error: createdEventsError
  } = useGetUserCreatedEventsQuery(Number(userId));

  const {
    data: finishedEvents = {results: []},
    isLoading: isFinishedEventsLoading,
    isError: isFinishedEventsError,
    error: finishedEventsError
  } = useGetUserFinishedEventsQuery(Number(userId));

  const {
    data: plannedEvents = {results: []},
    isLoading: isPlannedEventsLoading,
    isError: isPlannedEventsError,
    error: plannedEventsError
  } = useGetUserPlannedEventsQuery(Number(userId));

  const {
    data: remoteUser,
    isLoading: isLoadingRemoteUser,
    isError: isErrorRemoteUser,
    error: errorRemoteUser,
    isSuccess: isSuccessRemoteUser,
  } = useProfileDetailsQuery({ userId: userId });

  const {
    data: currentProfileData,
    isLoading: isLoadingProfileData,
    isError: isErrorProfileData,
    error: errorProfileData,
    isSuccess: isSuccessProfileData,
  } = useMyDetailsQuery();

  const {
    data: profileFollowingData = [],
    isLoading: isLoadingFollowingData,
    isError: isErrorFollowingData,
    error: errorFollowingData,
    isSuccess: isSuccessFollowingData,
  } = useGetFollowingQuery(
    {
      userId: String(currentProfileData?.id),
    },
    {
      skip: !currentProfileData,
    }
  );

  useLogServerError(isErrorRemoteUser, 'remoteUser', errorRemoteUser);
  useLogServerError(isErrorProfileData, 'currentUser', errorProfileData);
  useLogServerError(isErrorFollowingData, 'подписок', errorFollowingData);
  useLogServerError(isFinishedEventsError, 'посещенных ивентов', finishedEventsError);
  useLogServerError(isPlannedEventsError, 'запланированных ивентов', plannedEventsError);
  useLogServerError(isCreatedEventsError, 'созданных ивентов', createdEventsError);

  const isPrivateUser = remoteUser?.is_private;

  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();

  const followUser = () => {
    follow({ userId: userId })
      .unwrap()
      .then((res) => {
        setFollowStatus(res.status);
      })
      .catch((err) => console.log(err, "Добавить пользователя не получилось"));
  };

  const unfollowUser = () => {
    unfollow({ userId: userId })
      .unwrap()
      .then(() => setFollowStatus(undefined))
      .catch((err) =>
        console.log(err, "Отписаться от пользователя не получилось")
      );
  };

  useLayoutEffect(() => {
    if (isSuccessFollowingData) {
      setFollowStatus(
        () =>
          profileFollowingData.find(({ user }) => user === Number(userId))
            ?.status
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFollowingData]);

  const createdEventsList = getEventsCards(createdEvents.results, 'sm');
  const finishedEventsList = getEventsCards(finishedEvents.results, 'sm');
  const plannedEventsList = getEventsCards(plannedEvents.results, 'sm');

  if (isNaN(Number(userId))) {
    return <h1>404 Page not found</h1>;
  }

  if (Number(userId) === currentProfileData?.id) {
    navigate("/profile/me", { replace: true });
  }

  if (
    isLoadingRemoteUser ||
    isLoadingFollowingData ||
    isLoadingProfileData
  ) {
    return (
      <div className="m-auto">
        <ProfileLoader />
      </div>
    );
  }

  if (isSuccessRemoteUser && isSuccessProfileData && isSuccessFollowingData) {
    return (
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px] overflow-x-hidden">
        <ProfileInfo
          profileData={remoteUser}
          optionButton={
            <div className="flex mt-[80px] ">
              <Button
                size="sm"
                importance="none"
                extraClass="text-but-primary text-red-700 pl-[0] hoverscreen:hover:opacity-70 !bg-white"
              >
                Пожаловаться
              </Button>
            </div>
          }
        >
          <div className="flex flex-row">
            <ProfileFollowButton
              onFollow={followUser}
              onUnFollow={unfollowUser}
              isPrivate={isPrivateUser}
              isLoading={isFollowLoading || isUnfollowLoading}
              status={followStatus}
            />
            <Button size="md" importance="secondary" extraClass="ml-[20px]">
              Написать
            </Button>
          </div>
        </ProfileInfo>
        <div className="w-[65%] mt-[60px] flex flex-col">
          {
            isPrivateUser ? (
              <PrivateUserEventsCap remoteUser={remoteUser} />
            ) : (
              <>
                <EventsList
                  listTitle="Созданные"
                  isLoading={isCreatedEventsLoading}
                  extraClasses="before:!bg-slider-fade-out-xl before:!w-[450px]"
                  slidesLength={3}
                  arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
                  emptyElement={<SliderEmptyElem text="Не создано" />}
                  isError={isCreatedEventsError}
                >{createdEventsList}</EventsList>
                <EventsList
                  listTitle="Планирует посетить"
                  isLoading={isPlannedEventsLoading}
                  extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
                  slidesLength={3}
                  arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
                  emptyElement={<SliderEmptyElem text="Не запланированно" />}
                  isError={isPlannedEventsError}
                >{plannedEventsList}</EventsList>
                <EventsList
                  listTitle="Посещенные"
                  isLoading={isFinishedEventsLoading}
                  extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
                  slidesLength={3}
                  arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
                  emptyElement={<SliderEmptyElem text="Не найдено" />}
                  isError={isFinishedEventsError}
                >{finishedEventsList}</EventsList>
              </>
            )
          }
        </div>
      </section>
    );
  }

  return <p>Пользователь не найден</p>;
}

export default RemoteProfileView;
