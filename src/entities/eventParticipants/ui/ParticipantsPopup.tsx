import {Input, Popup} from "@/shared";
import {ChangeEvent, ReactElement, useCallback, useContext, useEffect, useState} from "react";
import Svg from "@/shared/ui/Svg";
import {EventPageContext} from "@/pages/event/model/EventPageContext";
import { useGetEventParticipantsQuery, useKickParticipantMutation } from "@/entities/eventParticipants/api/eventParticipantsApi";
import { IParticipant } from "@/entities/eventParticipants/model/types";
import { ParticipantCard } from "@/entities/eventParticipants";
import { useAppSelector } from "@/shared/model";
import { Preloader } from "@/shared/ui/Preloader";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from "use-debounce";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";

interface IParticipantsPopupProps {
  eventId: number;
  owner: IParticipant;
  isOpen: boolean;
  handleClose: () => void;
}

function ParticipantsPopup({ eventId, owner, isOpen, handleClose }: IParticipantsPopupProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [deletedParticipants, setDeletedParticipants] = useState<number[]>([]);
  const { isAuthorized } = useAppSelector((state) => state.session);

  const { isParticipant } = useAppSelector((state) => state.eventInfo);
  const { isOwner } = useContext(EventPageContext);

  const [debouncedValue] = useDebounce(inputValue, 700);

  const isOwnerShown = owner.username.toLowerCase().includes(debouncedValue.toLowerCase());

  const {
    data = {count: 0, next: null, results: []},
    isError,
    error,
    isLoading,
    isSuccess,
    refetch
  } = useGetEventParticipantsQuery({ event_id: eventId, search: debouncedValue, offset, owner });

  // error handling is not needed becouse block
  // can appear on the page only if the profile has already been loaded
  const {
    data: profile,
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery(undefined, { skip: !isAuthorized });

  isError && console.log(`Ошибка при получении участников - ${JSON.stringify(error)}`);

  const [kickParticipant] = useKickParticipantMutation();

  useEffect(() => {
    if (offset === 0) {
      refetch()
        .unwrap()
        .then(() => {return})
        .catch((err) => console.log(err))
    } else {
      setOffset(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleKickParticipant = async (user_id: number): Promise<void> => {
    await kickParticipant({ event_id: eventId, user_id })
      .unwrap()
      .then(() => {
        setDeletedParticipants((state) => [...state, user_id]);
      })
      .catch((err) => console.log(err));
  }

  const collectPartiсipants = useCallback(() => {
    if (isProfileSuccess) {
      const currentUserArr: IParticipant[] = isParticipant && profile?.username.toLowerCase().includes(debouncedValue.toLowerCase())
      ? [{ username: profile.username, id: profile.id, image_url: profile.image }]
      : [];
  
      const ownerArr: IParticipant[] = isOwnerShown ? [owner] : [];
  
      const filteredParticipants = data.results
      .filter((el) => el.id !== profile.id)
      .filter((el) => !deletedParticipants.some((item) => item === el.id));

      const participants = [
        ...ownerArr,
        ...currentUserArr,
        ...filteredParticipants
      ];

      let participantsCount = data.count - deletedParticipants.length;

      isOwnerShown ? participantsCount += 1 : null;
  
      return { participants, participantsCount };
    } else {
      const ownerArr: IParticipant[] = isOwnerShown ? [owner] : [];

      const participants = [
        ...ownerArr,
        ...data.results
      ];

      let participantsCount = data.count - deletedParticipants.length;

      isOwnerShown ? participantsCount += 1 : null;

      return { participants, participantsCount };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedParticipants, isParticipant, data]);

  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <div className="absolute flex flex-col top-[100px] left-[50%] translate-x-[-50%] bg-white min-w-[584px] rounded-[10px] px-[45px] py-[35px]">
      <Svg onClick={handleClose} id="close-cross" className="absolute top-[42px] right-[45px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70" />
        <div className="flex items-center">
          <h2 className="text-[30px] font-semibold">Список участников</h2>
          <Svg id="person-quantity-icon" className="w-8 h-8 ml-3" />
        </div>
        <Input
          size="lg"
          head={<Svg id="search-icon-def" className="w-6 h-6" />}
          className="mt-5 max-w-[470px]"
          extraInputClass="pl-3 placeholder:!text-placeholder-gray"
          placeholder="Поиск участников"
          value={inputValue}
          onChange={handleInputValue}
        />
        {
          isLoading ? (
            <div className="h-[372px] flex items-center justify-center">
              <Preloader />
            </div>
          ) : isSuccess ? (
            <>
              <p className="mt-3 font-semibold">{`Всего идёт: ${collectPartiсipants().participantsCount}`}</p>
                <InfiniteScroll
                  dataLength={data.results.length}
                  hasMore={!!data.next}
                  next={() => setOffset((state) => state + 10)}
                  loader={<p>Loading...</p>}
                  height={372}
                  className="pr-[22px] rounded-l-[20px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#F3F3F5] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]"
                >
                  {
                    collectPartiсipants().participants.map((el) => (
                      <ParticipantCard
                        key={el.id}
                        participant={el}
                        isCurrentUserCard={profile?.id === el.id}
                        isOwnerCard={owner.id === el.id}
                        isOwnerView={isOwner}
                        handleKickParticipant={handleKickParticipant}
                      />
                    ))
                  }
                </InfiniteScroll>
            </>
          ) : (<p>Не удалось загрузить участников, попробуйте перезагрузить страницу</p>)
        }
      </div>
    </Popup>
  )
}

export default ParticipantsPopup;
