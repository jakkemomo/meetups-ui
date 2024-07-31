import { ReactElement } from "react";
import { IChatMessage, Participant } from "../../model/types";

interface IChatMessageProps {
  sender?: Participant;
  message: IChatMessage;
  isOwner: boolean;
  isNewDate?: boolean;
}

function ChatMessage({ sender, message, isOwner, isNewDate }: IChatMessageProps): ReactElement {
  const messageDate = new Date(message.created_at);

  return (
    <>
      {isNewDate && <p className="self-center">{messageDate.toLocaleString('ru-RU', {day: 'numeric', month: 'short'})}</p>}
      <div className={`flex items-start mb-2.5 ${isOwner ? "flex-row-reverse" : ""}`}>
        <img className="w-[50px] h-[50px] rounded-circle" src="https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp" alt="Аватар пользователя" />
        <div className={`flex flex-col items-start ml-[22px] ${isOwner ? "items-end !ml-0 mr-[22px]" : ""}`}>
          <div className={`flex items-center mt-2.5 ${isOwner ? "flex-row-reverse" : ""}`}>
            <h3 className={`font-medium leading-[20px] w-[160px] truncate ${isOwner ? "!w-6 " : ""}`}>{isOwner ? 'Вы' : sender?.username}</h3>
            <p className={`text-[14px] leading-[18px] ml-[22px] text-placeholder-gray ${isOwner ? "!ml-0 mr-[22px]" : ""}`}>{messageDate.toLocaleString('ru-RU', {hour: 'numeric', minute: 'numeric'})}</p>
          </div>
          <div className={`bg-custom-gray p-3.5 rounded-b-def rounded-se-def mt-2.5 max-w-[290px] ${isOwner ? "!rounded-se-none rounded-s-def !bg-but-primary text-white" : ""}`}>
            <p className="break-words">{message.message_text}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatMessage;
