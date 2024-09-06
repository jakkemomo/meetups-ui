import { ReactElement } from "react";
import { IChatMessage, IParticipant } from "../../model/types";
import edit from "../../../../../public/images/edit-02.svg";
import checked from "../../../../../public/images/check-contained.svg";
import check from "../../../../../public/images/check-message.svg";
import doubleCheck from "../../../../../public/images/double-check.svg";
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
        <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 ml-10">
          <img
            src={edit}
            alt="редактировать"
            className="w-6 h-6 mt-6 cursor-pointer"
            onClick={() => editingMessage(message.id.toString())}
          />
        </div>
      ) : (
        <></>
        //Логика для ответа и добавления в избранное пока опущена
        // <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 mr-10">
        //   <img 
        //     src={answer}
        //     alt="ответить"
        //     className="w-5 h-5 mt-6 cursor-pointer" 
        //   />
        //   <img 
        //     src={favorites} 
        //     alt="закрепить"
        //     className="w-6 h-6 mt-6 cursor-pointer" 
        //   />
        // </div>
      )}
       <div className={`flex items-start mb-2.5 ${isOwner ? 'flex-row-reverse' : ''}`}>
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
          className={`w-[50px] h-[50px] rounded-circle cursor-pointer ${isCheckVisible ? "bg-color-secondary-200" : ""}`} 
          src={`https://storage.googleapis.com/meetups-dev/media/${userImage}`} 
          alt="Аватар пользователя" 
          onClick={() => navigate(`/profile/${sender?.id}`)}
        />
        <div className={`flex flex-col ${isOwner ? "flex-row-reverse items-end mr-[22px]" : "items-start ml-[22px]"}`}>
          <div className={`flex items-center mt-2.5 ${isOwner ? "flex-row-reverse" : ""}`}>
            <h3 
              className="font-medium leading-[20px] w-auto truncate cursor-pointer hover:text-secondary-500"
              onClick={() => navigate(`/profile/${sender?.id}`)}
            >
              {sender?.username}
            </h3>
          </div>
          <div className={`mt-2.5 max-w-[290px] flex items-end ${isOwner ? "bg-main-violet-600 text-white rounded-[20px] rounded-tr-[4px] self-start" : "bg-secondary-100 rounded-[20px] rounded-tl-[4px] self-end"} p-3`}>
            <p className="break-words flex-1 mr-2">{message.message_text}</p>
            <div className={`flex items-center gap-1 mt-1 ${isOwner ? "text-secondary-300" : "text-secondary-500"} text-[11px] italic whitespace-nowrap`}>
              <p>{messageDate.toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' })}</p>
              {message.read_at && isOwner && <img src={doubleCheck} alt="просмотрено" />}
              {!message.read_at && isOwner && <img src={check} alt="не просмотрено" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;
