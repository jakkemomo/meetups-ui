import { IParticipant } from "@/entities/eventParticipants/model/types";
import { useFollowMutation, useGetFollowStatusQuery, useMyDetailsQuery, useUnFollowMutation } from "@/entities/profile/api/profileApi";
import { FollowStatusEnum } from "@/entities/profile/model/types";
import { EventPageContext } from "@/pages/event/model/EventPageContext";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/model";
import Svg from "@/shared/ui/Svg";
import { ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface ICreatorDetails {
  creator: IParticipant;
}

export function CreatorDetails({ creator }: ICreatorDetails): ReactElement {
  const { isOwner } = useContext(EventPageContext);
  const navigate = useNavigate();
  const { isAuthorized } = useAppSelector((state) => state.session);

  const {
    data: profile,
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery(undefined, {
    skip: !isAuthorized
  });

  const {
    data: followStatus
  } = useGetFollowStatusQuery({
    user_id: String(profile?.id ?? 0),
    followed_user_id: String(creator.id)
  }, { skip: !isProfileSuccess });

  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();

  const onFollowButtonClick = () => {
    if (followStatus?.status === FollowStatusEnum.DECLINED || followStatus?.status === FollowStatusEnum.NOT_FOLLOWED) {
      follow({ userId: String(creator.id) })
        .then(() => {return})
        .catch(() => {return})
    } else {
      unfollow({ userId: String(creator.id) })
        .then(() => {return})
        .catch(() => {return})
    }
  }

  return (
    <section className="max-w-[1125px] mt-[90px] self-stretch text-xl leading-[1.3] text-text-black">
      <h2 className="text-[28px] font-semibold">
      Кто приглашает
      </h2>
      <div className="flex mt-7">
        <img
          onClick={isProfileSuccess ? () => navigate(`/profile/${creator.id}`) : undefined}
          className="h-[130px] w-[130px] rounded-circle cursor-pointer duration-150 hoverscreen:hover:opacity-70"
          src={`https://storage.googleapis.com/meetups-dev/media/${creator.image_url}`}
          alt={`Аватар пользователя ${creator.username}`}
        />
        <div className="flex flex-col ml-10">
          <h3
            onClick={isProfileSuccess ? () => navigate(`/profile/${creator.id}`) : undefined}
            className="underline text-[24px] font-semibold cursor-pointer duration-150 hoverscreen:hover:opacity-70"
          >{creator.username}
          </h3>
          <p className="text-[18px] leading-[23px] mt-3.5 max-w-[728px] whitespace-pre-wrap break-words mb-auto">{creator.bio ?? "У организатора в профиле нет описания"}</p>
          {
            (!isOwner && isProfileSuccess) && (
              <div className="flex mt-[22px]">
                <Button
                  type="button"
                  importance="primary"
                  size="md"
                >Написать организатору</Button>
                <Button
                  type="button"
                  onClick={onFollowButtonClick}
                  importance="secondary"
                  size="md"
                  extraClass="ml-5"
                  disabled={isFollowLoading || isUnfollowLoading}
                >{
                  (followStatus?.status === FollowStatusEnum.ACCEPTED ||
                  followStatus?.status === FollowStatusEnum.PENDING) ?
                  'Отписаться' : 'Подписаться'
                }</Button>
              </div>
            )
          }
        </div>
        <Svg id="dialog-bubble-icon" className="w-[182px] h-[182px] ml-auto shrink-0"/>
      </div>
    </section>
  )
}
