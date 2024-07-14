import { Button } from "@/shared/ui/Buttons/Button";
import { ReactElement } from "react";

export interface IProfileFollowButton {
  onFollow?: () => void;
  onUnFollow?: () => void;
  isPrivate?: boolean;
  isLoading?: boolean;
  status?: string;
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
      {status && status === "ACCEPTED" && (
        <Button
          size="lg"
          importance="secondary"
          disabled={isLoading}
          onClick={onUnFollow}
        >
          Отписаться
        </Button>
      )}

      {isPrivate && (!status || status === "DECLINE") && (
        <Button
          size="lg"
          importance="primary"
          disabled={isLoading}
          onClick={onFollow}
        >
          Подать заявку
        </Button>
      )}

      {status && status === "PENDING" && (
        <Button size="lg" importance="primary" disabled={true}>
          Заявка подана
        </Button>
      )}

      {!status && !isPrivate && (
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
