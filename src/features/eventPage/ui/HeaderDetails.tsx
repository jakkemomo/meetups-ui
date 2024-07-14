import { IDetailedEvent } from "@/entities/event/model/types";
import { useEventActions } from "@/entities/event/lib/useEventActions";
import { EventPageContext } from "@/pages/event/model/EventPageContext";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/model";
import Svg from "@/shared/ui/Svg";
import { Popover } from "@headlessui/react";
import { ReactElement, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IHeaderDetailsProps {
  event: IDetailedEvent;
  handleOpenParticipantsPopup: () => void;
}

export function HeaderDetails({ event, handleOpenParticipantsPopup }: IHeaderDetailsProps): ReactElement {
  const navigate = useNavigate();
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(false);

  const { isParticipant } = useAppSelector((state) => state.eventInfo);
  const { eventId } = useParams<{eventId: string}>();

  const { isOwner, isFavorite } = useContext(EventPageContext);

  const {
    handleRegisterToEvent,
    handleLeaveFromEvent,
    handleLikeEvent,
    handleUnlikeEvent
  } = useEventActions(Number(eventId));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(event.private_token ?? '')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const onRegisterToEvent = () => {
    setIsRegisterButtonDisabled(true);

    handleRegisterToEvent()
      .then(() => {
        setIsRegisterButtonDisabled(false);
      })
      .catch((err) => console.log(err))
  }

  const onLeaveFromEvent = () => {
    setIsRegisterButtonDisabled(true);

    handleLeaveFromEvent()
      .then(() => {
        setIsRegisterButtonDisabled(false);
      })
      .catch((err) => console.log(err))
  }

  return (
    <section className="relative flex flex-col w-[43.2%] bg-custom-gray px-[30px] py-5 rounded-l-[15px]">
      <h2 className="text-[18px] text-indigo-700">{event.category?.name}</h2>
      <h1 className="font-semibold leading-[44px] text-[35px] text-text-black mt-5 max-w-[430px] break-words">{event.name}</h1>
      <Svg
        id="heart-icon"
        extraUseClass={isFavorite ? "!fill-but-primary stroke-but-primary" : "stroke-text-black"}
        className="absolute top-[76px] right-[30px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={isFavorite ? handleUnlikeEvent : handleLikeEvent}
      />
      <div className="event_details flex flex-col space-y-[18px] text-[22px] text-neutral-800 mt-[30px]">
        <div className="flex items-center">
          <Svg id="calendar-icon" className="w-8 h-8 shrink-0" />
          <p className="text-[26px] font-normal ml-2.5">{event.start_date ? new Date(event.start_date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'}) : ''}</p>
        </div>
        <div className="flex items-center">
          <Svg id="clock-icon" className="w-8 h-8 shrink-0" />
          <p className="text-[26px] font-normal ml-2.5">{event.start_time ? event.start_time.slice(0, 5) : ''}</p>
        </div>
        <div className="flex items-center">
          <Svg id="map-marker-icon" className="w-8 h-8 shrink-0" />
          <p className="text-[18px] leading-def ml-2.5">{event.address ?? ''}</p>
        </div>
      </div>
      {
        isOwner ? (
          <div className="flex mt-auto">
            <Button
              type="button"
              onClick={() => navigate(`/events/${event.id}/edit`)}
              importance="primary"
              size="md"
              extraClass="self-start text-[18px] font-semibold"
            >Редактировать</Button>
            {
              event.type !== 'open' && (
                <Popover className="relative ml-auto mr-[35px]">
                  <Popover.Panel className="absolute bottom-[50px] flex items-center border-1 border-solid border-main-blue rounded-[10px] h-[45px] w-[450px] bg-gray px-5 py-2 z-50">
                    <p className="truncate">{event.private_token}</p>
                    <button type="button" onClick={copyToClipboard} className="text-[30px] ml-auto">&#10557;</button>
                  </Popover.Panel>
                  <Popover.Button as='div'>
                    <Button
                      type="button"
                      size="sm"
                      importance="primary"
                      extraClass="!pl-3.5 !pr-[18px]"
                    >
                      <Svg id="link-icon" className="w-6 h-6 mr-2"/>
                      Ссылка
                    </Button>
                  </Popover.Button>
                </Popover>
              )
            }
          </div>
        ) : (
          <Button
            type='button'
            importance={isParticipant ? 'secondary' : 'primary'}
            extraClass="self-start text-[18px] font-semibold mt-auto"
            size="md"
            onClick={isParticipant ? onLeaveFromEvent : onRegisterToEvent}
            disabled={isRegisterButtonDisabled}
          >{isParticipant ? "Не смогу прийти" : "Присоединиться"}</Button>
        )
      }
      <div className="relative flex items-end justify-between mt-3">
        <p className="text-[18px] leading-[23px] font-medium">Вход: {`${event.cost ? `${event.cost.split('.')[0]} ${event.currency.name}` : "свободный"}`}</p>
        <Button
          type="button"
          onClick={handleOpenParticipantsPopup}
          extraClass={`!absolute right-0 bottom-0 ${event.any_participant_number ? "!items-end" : "!items-center"}`}
        >
          <p className={`${event.any_participant_number ? "text-[32px] leading-[40px]" : "text-[14px] leading-[18px]"}`}>{event.any_participant_number ? "∞" : "Список участников"}</p>
          <Svg className="w-8 h-8 ml-1" id="person-quantity-icon"/>
        </Button>
      </div>
    </section>
  )
}
