import { ProfileDetails } from '@/entities/profile/model/types';
import Svg from '@/shared/ui/Svg';
import { ReactElement } from 'react';

interface IPrivateUserEventsCapProps {
  remoteUser: ProfileDetails;
}

export function PrivateUserEventsCap({ remoteUser }: IPrivateUserEventsCapProps): ReactElement {
  return (
    <>
      <h2 className="text-[28px] font-semibold text-but-primary">Это закрытый профиль</h2>
      <p className="mt-[26px] text-[20px] font-medium">
        {`Подпишитесь на ${remoteUser.username}, чтобы смотреть ${remoteUser.gender === 'FEMALE' ? 'её' : 'его'} мероприятия`}
      </p>
      <Svg
        id="private-profile-lock"
        className="w-[125px] h-[125px] mt-5"
      />
    </>
  );
}
