import { ChangeEvent, ReactElement, useState, KeyboardEvent } from "react";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import send from '../../../../public/images/send.svg';
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatMessage } from "@/entities/chat/chatMessage";
import { useDeleteMessageMutation, useSendMessageMutation, useUpdateMessageMutation } from "@/entities/chat/api/chatsApi";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { IChatMessage, IParticipant } from "@/entities/chat/model/types";
import { getMessageText } from "../lib/getMessageText";

interface IContactsListProps {
  chatId: number;
  messages: IChatMessage[];
  participants: IParticipant[];
}

const ChatInterface = ({ chatId, messages, participants }: IContactsListProps): ReactElement => {
  const [editingMessageId, setEditingMessageId] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [choosingMessages, setChoosingMessages] = useState<string[]>([]);

  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const { data: profileData } = useMyDetailsQuery();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleTailClick = async () => {
    if (messageText.trim() !== '') {
      if (editingMessageId) {
        await handleSaveEdit();
      } else {
        try {
          await sendMessage({
            chat_id: String(chatId),
            message_text: messageText,
          }).unwrap();
          setMessageText('');
        } catch (error) {
          console.error('Не получилось отправить сообщение', error);
        }
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editingMessageId) {
      try {
        await updateMessage({
          message_id: Number(editingMessageId),
          message_text: messageText,
          chat_id: chatId
        }).unwrap();
        setEditingMessageId('');
        setMessageText('');
      } catch (error) {
        console.error('Ошибка при обновлении сообщения:', error);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void handleTailClick();
    }
  };

  const choosingMessage = (messageId: string) => {
    setChoosingMessages((prevState) => {
      if (prevState.includes(messageId)) {
        return prevState.filter((mess) => mess !== messageId);
      } else {
        return [...prevState, messageId];
      }
    });
  };

  const cleanChoosingMessages = () => {
    setChoosingMessages([]);
  }

  const editingMessage = (messageId: string, messageText: string) => {
    setEditingMessageId(messageId);
    setMessageText(messageText);
  };

  const deletingMessage = async (messagesIds: string[]) => {
    for (const messageId of messagesIds) {
      try {
        await deleteMessage({
          message_id: Number(messageId),
          chat_id: chatId,
        }).unwrap();
        if (editingMessageId === messageId) {
          setEditingMessageId('');
          setMessageText('');
        }
      } catch (error) {
        console.error('Ошибка при удалении сообщения:', error);
      }
    }
    cleanChoosingMessages();
  };

  const companionInfo = participants.find((el) => el.id !== profileData?.id);
  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col pl-[46px] w-full">
      {choosingMessages.length > 0 && 
        <div className="w-full flex items-center mb-5 justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-regular leading-[18px]">{getMessageText(choosingMessages.length)}</p>
          <button 
            className="w-6 h-6 cursor-pointer bg-[url('../../../../public/images/close-cross.svg')] bg-no-repeat"
            onClick={cleanChoosingMessages}
            >
            </button>
        </div>
        <div className="flex gap-3">
          <button 
            className="w-6 h-6 cursor-pointer bg-[url('../../../../public/images/trash-03.svg')] bg-no-repeat"
            onClick={() => void deletingMessage(choosingMessages)}
          >
          </button>
          <button className="w-6 h-6 cursor-pointer bg-[url('../../../../../public/images/favorites.svg')] bg-no-repeat"></button>
        </div>
      </div>
      }
      <div className="flex items-end w-full border-b-3 border-b-solid border-b-custom-gray pb-[18px]">
        <figure className="flex items-center">
          <img
            className="w-[70px] aspect-square rounded-circle"
            src={`https://storage.googleapis.com/meetups-dev/media/${companionInfo?.image_url}`}
            alt={`Аватар пользователя ${companionInfo?.username}`}
          />
          <figcaption className="flex flex-col ml-[22px]">
            <h2 className="text-[18px] rounded-circle font-medium leading-[23px]">{companionInfo?.username}</h2>
            <p className="text-but-primary text-[14px] font-medium leading-[18px] relative mt-2 ml-[18px] before:absolute before:left-[-18px] before:top-1/2 before:translate-y-[-50%] before:rounded-circle before:w-2.5 before:aspect-square before:bg-but-primary">Онлайн</p>
          </figcaption>
        </figure>
        <Input
          type="search"
          placeholder="Ищите в диалоге"
          head={<Svg id="search-icon-def" className="w-6 h-6" />}
          className="!bg-transparent ml-auto mb-2 max-w-[180px]"
          extraInputClass="pl-[9px] placeholder:!text-placeholder-gray"
        />
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-col-reverse overflow-auto pt-[18px]">
        <InfiniteScroll
          dataLength={messages ? messages.length : 1}
          next={() => { return; }}
          hasMore={false}
          loader={<p>Loading...</p>}
          className="flex flex-col"
          scrollableTarget="scrollableDiv"
        >
          {reversedMessages.map((el, index) => (
            <ChatMessage
              userImage={el.image_url}
              key={index}
              sender={participants.find((person) => person.id === el.created_by)}
              message={el}
              isOwner={el.created_by === profileData?.id}
              editingMessage={(id: string) => editingMessage(id, el.message_text)}
              choosingMessage={(id: string) => choosingMessage(id)}
              isCheckVisible={choosingMessages.includes(el.id.toString())}
              isNewDate={
                index > 0 && new Date(`${el.created_at.slice(0, 10)} 24:00`) >
                            new Date(`${messages[index - 1].created_at.slice(0, 10)} 24:00`)
              }
            />
          ))}
        </InfiniteScroll>
      </div>
      <Input
        value={messageText}
        onChange={handleInputChange}
        type="text"
        size="lg"
        className="mt-auto text-[18px]"
        tail={<img className="cursor-pointer" src={send} alt="send" onClick={() => { void handleTailClick(); }}/>}
        extraInputClass="pl-3"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInterface;
