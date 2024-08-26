import { FollowStatusEnum } from "@/entities/profile/model/types";
import { Button } from "@/shared/ui/Buttons/Button";
import { ReactElement } from "react";

export interface IProfileFollowButton {
  onFollow?: () => void;
  onUnFollow?: () => void;
  isPrivate?: boolean;
  isLoading?: boolean;
  status?: FollowStatusEnum;
}

export function ProfileFollowButton({
  onFollow,
  onUnFollow,
  isPrivate,
  isLoading,
  status,
}: IProfileFollowButton): ReactElement {
  return (
    <>
      {status && status === FollowStatusEnum.ACCEPTED && (
        <Button
          size="lg"
          importance="secondary"
          disabled={isLoading}
          onClick={onUnFollow}
        >
          Отписаться
        </Button>
      )}

      {isPrivate && (!status || status === FollowStatusEnum.DECLINED) && (
        <Button
          size="lg"
          importance="primary"
          disabled={isLoading}
          onClick={onFollow}
        >
          Подать заявку
        </Button>
      )}

      {status && status === FollowStatusEnum.PENDING && (
        <Button size="lg" importance="primary" disabled={true}>
          Заявка подана
        </Button>
      )}

      {status === FollowStatusEnum.NOT_FOLLOWED && !isPrivate && (
        <Button
          size="lg"
          importance="primary"
          disabled={isLoading}
          onClick={onFollow}
        >
          Подписаться
        </Button>
      )}
    </>
  );
}
