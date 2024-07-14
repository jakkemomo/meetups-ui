import { IParticipant } from "@/entities/eventParticipants/model/types";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { EventPageContext } from "@/pages/event/model/EventPageContext";
import { Button } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { skipToken } from "@reduxjs/toolkit/query";
import { ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface ICreatorDetails {
  creator: IParticipant;
}

export function CreatorDetails({creator}: ICreatorDetails): ReactElement {
  const { isOwner } = useContext(EventPageContext);
  const navigate = useNavigate();

  const {
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery(skipToken);

  return (
    <section className="max-w-[1125px] mt-[90px] self-stretch text-xl leading-[1.3] text-text-black">
      <h2 className="text-[28px] font-semibold">
      Кто приглашает
      </h2>
      <div className="flex mt-7">
        <img className="h-[130px] w-[130px] rounded-circle" src={`https://storage.googleapis.com/meetups-dev/media/${creator.image_url}`} alt={`Аватар пользователя ${creator.username}`} />
        <div className="flex flex-col ml-10">
          <h3 onClick={isProfileSuccess ? () => navigate(`/profile/${creator.id}`) : undefined} className="underline text-[24px] font-semibold">{creator.username}</h3>
          <p className="text-[18px] leading-[23px] mt-3.5 max-w-[728px] whitespace-pre-wrap break-words">{creator.bio ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsumhasbeentheindustry'sstandardummytexteversincethe1500s,whenanunknownprintertookagalleyoftypeand scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
          {
            !isOwner && (
              <div className="flex mt-[22px]">
                <Button
                  type="button"
                  importance="primary"
                  size="md"
                >Написать организатору</Button>
                <Button
                  type="button"
                  importance="secondary"
                  size="md"
                  extraClass="ml-5"
                >Подписаться</Button>
              </div>
            )
          }
        </div>
        <Svg id="dialog-bubble-icon" className="w-[182px] h-[182px] ml-auto shrink-0"/>
      </div>
    </section>
  )
}
