import { ReactElement, useMemo } from "react";
import { IChatDetails, IChatMessage } from "../../model/types";
import { getLastMessageDate } from "../lib/getLastMessageDate";

interface IContactCard {
  data: IChatDetails | IChatMessage;
  onClick: () => void;
  isSelected: boolean;
  type: string;
}

const ContactCard = ({ data, onClick, isSelected, type }: IContactCard): ReactElement => {

  const lastMessage = useMemo(() => {
    if ('last_message_text' in data) {
      return data.last_message_is_owner ? `Вы: ${data.last_message_text}` : data.last_message_text;
    }
    return ''; 
  }, [data]);

  const message = type === 'search' ? (data as IChatMessage).message_text : lastMessage;
  const date = type === 'search' ? (data as IChatMessage).created_at : (data as IChatDetails).last_message_created_at;
  const user = type === 'search' ? (data as IChatMessage).username : (data as IChatDetails).name;

  const unreadMessageCounter = 'unread_message_counter' in data ? data.unread_message_counter : 0;


  return (
    <div
      className={`flex pr-[11px] cursor-pointer ${isSelected ? 'bg-gradient-to-l from-secondary-100 rounded-lg' : ''}`}
      onClick={onClick}
    >
      <img
        className="rounded-circle w-[70px] h-[70px]"
        src={`https://storage.googleapis.com/meetups-dev/media/${data.image_url}`}
        alt="Аватар пользователя"
      />
      <div className="w-full flex flex-col ml-[22px] mt-2.5">
        <div className="flex w-full justify-between">
          <h3 className="text-text-black text-[18px] font-medium leading-[23px] truncate max-w-[230px]">{user}</h3>
          <p className="text-[14px] text-secondary-300">{getLastMessageDate(date)}</p>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className="text-[14px] text-[#616161] leading-[18px] truncate max-w-[280px]">{message}</p>
          {unreadMessageCounter > 0 && (
            <div className="rounded-circle bg-main-violet-600 w-4 h-4 flex items-center justify-center text-white text-[12px]">
              {unreadMessageCounter}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

