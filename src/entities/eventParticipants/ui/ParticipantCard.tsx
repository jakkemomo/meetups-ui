import { config } from "@/shared/config";
import { ReactElement, useState } from "react";
import { IParticipant } from "../model/types";
import { IconButton } from "@/shared";
import { useNavigate } from "react-router-dom";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";

interface IParticipantCardProps {
  participant: IParticipant;
  isCurrentUserCard: boolean;
  isOwnerCard: boolean;
  isOwnerView: boolean;
  handleKickParticipant: (userId: number) => Promise<void>;
}

function ParticipantCard({
  participant,
  isCurrentUserCard,
  isOwnerCard,
  isOwnerView,
  handleKickParticipant
}: IParticipantCardProps): ReactElement {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery();

  const onKick = (user_id: number) => {
    setIsButtonDisabled(true);

    handleKickParticipant(user_id)
      .then(() => {
        setIsButtonDisabled(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <figure className="flex items-center mt-3">
      <img
        onClick={isProfileSuccess ? () => navigate(`/profile/${participant.id}`) : undefined}
        src={`${config.BASE_IMAGE_URL}${participant.image_url}`}
        className="w-[50px] h-[50px] rounded-circle cursor-pointer"
        alt={`Аватар пользователя ${participant.username}`}
      />
      <figcaption
        onClick={isProfileSuccess ? () => navigate(`/profile/${participant.id}`) : undefined}
        className="ml-3 text-[18px] font-medium max-w-[300px] truncate cursor-pointer"
      >{participant.username}</figcaption>
      {
        isOwnerCard ? (
          <p className="ml-auto font-medium text-[rgb(143,143,143)]">Организатор</p>
        ) : isCurrentUserCard ? (
          <p className="ml-auto font-medium text-[rgb(143,143,143)]">Вы</p>
        ) : (
          <IconButton
            onClick={isOwnerView ? () => onKick(participant.id) : undefined}
            iconId={isOwnerView ? "delete-person-icon" : "add-person-icon"}
            size="lg"
            importance={isOwnerView ? "primary-opposite" : "primary"}
            extraClass="ml-auto"
            disabled={isButtonDisabled}
          />
        )
      }
    </figure>
  )
}

export default ParticipantCard;
