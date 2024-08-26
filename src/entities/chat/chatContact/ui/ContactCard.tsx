import { ReactElement } from "react";
import { IChatDetails } from "../../model/types";
import { getLastMessageDate } from "../lib/getLastMessageDate";

interface IContactCard {
  data: IChatDetails;
  onClick: () => void;
  isSelected: boolean
}


function ContactCard({ data, onClick, isSelected }: IContactCard): ReactElement {
  return (
    <div className={`flex pr-[11px] cursor-pointer ${isSelected ? 'bg-gradient-to-l from-secondary-100 rounded-lg' : ''}`} onClick={onClick}>
      <img className="rounded-circle w-[70px] h-[70px]" src={`https://storage.googleapis.com/meetups-dev/media/${data.image_url}`} alt={`Аватар пользователя ${data.name}`} />
      <div className="w-full flex flex-col ml-[22px] mt-2.5">
        <div className="flex w-full justify-between">
          <h3 className="text-text-black text-[18px] font-medium leading-[23px] truncate max-w-[230px]">{data.name}</h3>
          <p className="text-[14px] text-placeholder-gray">{getLastMessageDate(data.last_message_created_at)}</p>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className="text-[14px] text-[#616161] leading-[18px] truncate max-w-[280px]">{data.last_message_text}</p>
          <div className="rounded-circle bg-main-violet-600 w-4 h-4 flex items-center justify-center text-white text-[12px]">2</div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard;
