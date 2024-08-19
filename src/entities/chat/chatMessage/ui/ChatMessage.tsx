import { ReactElement } from "react";
import { IChatMessage, IParticipant } from "../../model/types";

interface IChatMessageProps {
  sender?: IParticipant;
  message: IChatMessage;
  isOwner: boolean;
  isNewDate?: boolean;
  userImage: string;
  editingMessage: (id: string) => void;
}

function ChatMessage({ sender, message, isOwner, isNewDate, userImage, editingMessage}: IChatMessageProps): ReactElement {
  
  const messageDate = new Date(message.created_at);

  return (
    <div className="relative group flex flex-col">
      {isNewDate && <p className="self-center">{messageDate.toLocaleString('ru-RU', { day: 'numeric', month: 'short' })}</p>}
      {isOwner ? (
        <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
          <button className="w-6 h-6 mt-6 bg-[url('../../../../../public/images/favorites.svg')] bg-no-repeat"></button>
          <button
            className="w-6 h-6 mt-6 bg-[url('../../../../../public/images/edit-02.svg')]"
            onClick={() => editingMessage(message.id.toString())}
          ></button>
        </div>
      ) : (
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
          <button className="w-5 h-5 mt-6 bg-center bg-[url('../../../../../public/images/answer.svg')]"></button>
          <button className="w-6 h-6 mt-6 bg-[url('../../../../../public/images/favorites.svg')] bg-no-repeat"></button>
        </div>
      )}
       <div className={`flex items-start mb-2.5 ${isOwner ? "flex-row-reverse" : ""}`}>
        <img className="w-[50px] h-[50px] rounded-circle" src={`https://storage.googleapis.com/meetups-dev/media/${userImage}`} alt="Аватар пользователя" />
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
    </div>
  )
}

export default ChatMessage;
