import { ReactElement } from "react";
import { IChatMessage, IParticipant } from "../../model/types";
import answer from "../../../../../public/images/answer.svg";
import edit from "../../../../../public/images/edit-02.svg";
import favorites from "../../../../../public/images/favorites.svg";
import checked from "../../../../../public/images/check-contained.svg";
import { useNavigate } from "react-router-dom";

interface IChatMessageProps {
  sender?: IParticipant;
  message: IChatMessage;
  isOwner: boolean;
  isNewDate?: boolean;
  userImage: string;
  editingMessage: (id: string) => void;
  choosingMessage: (id: string) => void;
  isCheckVisible: boolean; 
}

function ChatMessage({ sender, message, isOwner, isNewDate, userImage, editingMessage, isCheckVisible, choosingMessage}: IChatMessageProps): ReactElement {
  const messageDate = new Date(message.created_at);
  const navigate = useNavigate();

  return (
    <div className="relative group flex flex-col">
      {isNewDate && <p className="self-center text-[14px] text-secondary-300">{messageDate.toLocaleString('ru-RU', { day: 'numeric', month: 'short' })}</p>}
      {isOwner ? (
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 mr-10">
          <img
            src={edit}
            alt="редактировать"
            className="w-6 h-6 mt-6 cursor-pointer"
            onClick={() => editingMessage(message.id.toString())}
          />
          <img 
            src={favorites} 
            alt="закрепить"
            className="w-6 h-6 mt-6 cursor-pointer" 
          />
        </div>
      ) : (
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 mr-10">
          <img 
            src={answer}
            alt="ответить"
            className="w-5 h-5 mt-6 cursor-pointer" 
          />
          <img 
            src={favorites} 
            alt="закрепить"
            className="w-6 h-6 mt-6 cursor-pointer" 
          />
        </div>
      )}
       <div className="flex items-start mb-2.5">
        <button
          className="w-6 h-6 cursor-pointer"
          onClick={() => choosingMessage(message.id.toString())}
        >
          {isCheckVisible && 
            <img
              className="w-6 h-6 cursor-pointer"
              src={checked}
            />
          }
        </button>
        <img 
          className={`w-[50px] h-[50px] rounded-circle ${isCheckVisible ? 'bg-color-secondary-200' : ''}`} 
          src={`https://storage.googleapis.com/meetups-dev/media/${userImage}`} 
          alt="Аватар пользователя" 
        />
        <div className="flex flex-col items-start ml-[22px]">
          <div className="flex items-center mt-2.5">
            <h3 
              className="font-medium leading-[20px] w-auto truncate cursor-pointer hover:text-secondary-500"
              onClick={() => navigate(`/profile/${sender?.id}`)}
            >
              {sender?.username}
            </h3>
            <p className="text-[14px] leading-[18px] ml-[22px] text-secondary-300">{messageDate.toLocaleString('ru-RU', {hour: 'numeric', minute: 'numeric'})}</p>
          </div>
          <div className={`p-3.5 rounded-b-def rounded-se-def mt-2.5 max-w-[290px] ${isOwner ? "bg-main-violet-600 text-white" : "bg-secondary-100"}`}>
            <p className="break-words">{message.message_text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;
