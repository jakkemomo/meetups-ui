import { IDetailedEvent } from "@/entities/event/model/types";
import { GoogleMap } from "@/features/googleMap";
import { useEventActions } from "@/entities/event/lib/useEventActions";
import { EventPageContext } from "@/pages/event/model/EventPageContext";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/model";
import Svg from "@/shared/ui/Svg";
import { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom";

interface ILocationProps {
  event: IDetailedEvent;
}

export function Location({event}: ILocationProps): ReactElement {
  const { isOwner, isFavorite } = useContext(EventPageContext);
  const { isParticipant } = useAppSelector((state) => state.eventInfo);
  const { eventId } = useParams<{eventId: string}>();

  const {
    handleRegisterToEvent,
    handleLeaveFromEvent,
    handleLikeEvent,
    handleUnlikeEvent
  } = useEventActions(Number(eventId));

  return (
    <section className="w-full mt-[90px]">
      <div className="text-text-black text-[28px] font-semibold">
        Локация
      </div>
      <div className="flex w-full h-[300px] mt-7">
        <div className="bg-but-primary p-[24px] text-white flex flex-col justify-between rounded-l-def w-[34.5%]">
          <p className="text-[20px] leading-[25px]">
            {event.address}
          </p>
          <div className="flex items-center">
            <Button
              type="button"
              importance="secondary"
              size="md"
              extraClass="!bg-white hoverscreen:hover:opacity-70"
              onClick={isOwner ? undefined : isParticipant ? handleLeaveFromEvent : handleRegisterToEvent}
            >{isOwner ? "Редактировать" : isParticipant ? "Не смогу прийти" : "Пойду на встречу"}</Button>
            <Svg
              id="heart-icon"
              extraUseClass={`stroke-white ${isFavorite ? "!fill-white" : ""}`}
              className="w-6 h-6 ml-5 cursor-pointer duration-150 hoverscreen:hover:opacity-70"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={isFavorite ? handleUnlikeEvent : handleLikeEvent}
            />
          </div>
        </div>
        <GoogleMap position={{ lat: event.location[1], lng: event.location[0] }} zoom={14} markersArr={[{geometry: {coordinates: event.location}}]} extraClasses="!rounded-r-[10px] !rounded-l-none max-h-full border-2 border-but-primary"/>
      </div>
    </section>
  )
}
