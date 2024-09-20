import { ChangeEvent, ReactElement, useState, KeyboardEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "@/shared";
import { SearchMessagesInput } from "@/features/searchMessages/ui/SearchMessagesInput";
import { ChatMessage } from "@/entities/chat/chatMessage";
import { useDeleteMessageMutation, useMarkMessagesAsReadMutation, useSendMessageMutation, useUpdateMessageMutation } from "@/entities/chat/api/chatsApi";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { IChatMessage, IParticipant } from "@/entities/chat/model/types";
import { getMessageText } from "../lib/getMessageText";
import send from '../../../../public/images/send.svg';
import favorites from '../../../../public/images/favorites.svg';
import trash from '../../../../public/images/trash-03.svg';
import close from '../../../../public/images/close-cross.svg';

interface IContactsListProps {
  chatId: number;
  messages: IChatMessage[];
  participants: IParticipant[];
  // handleOffset: () => void;
  // hasMore: boolean,
  // type: ChatType
}

const ChatInterface = ({ chatId, messages, participants }: IContactsListProps): ReactElement => {
  const navifate = useNavigate();

  const [editingMessageId, setEditingMessageId] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [initialMessageText, setInitialMessageText] = useState<string>('');
  const [checkedMessages, setCheckedMessages] = useState<Record<string, boolean>>({});
  const [isSending, setIsSending] = useState(false);

  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const { data: profileData } = useMyDetailsQuery();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, func: (value: string) => void) => {
    func(e.target.value);
  };

  const handleTailClick = async () => {
    if (messageText.trim() !== '' && !isSending) {
      setIsSending(true);
      if (editingMessageId) {
        await handleSaveEdit();
      } else {
        try {
          await sendMessage({ chat_id: String(chatId), message_text: messageText }).unwrap();
          setMessageText('');
        } catch (error) {
          console.error('Не получилось отправить сообщение', error);
        }
      }
      setIsSending(false);
    }
  };

  const cleanMessage = () => {
    setEditingMessageId('');
    setMessageText('');
    setInitialMessageText('');
  };

  const handleSaveEdit = async () => {
    if (editingMessageId && messageText !== initialMessageText) {
      try {
        await updateMessage({
          message_id: Number(editingMessageId),
          message_text: messageText,
          chat_id: chatId
        }).unwrap();
        cleanMessage();
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
    setCheckedMessages((prevState) => ({
      ...prevState,
      [messageId]: !prevState[messageId],
    }));
  };

  const cleanChoosingMessages = () => {
    setCheckedMessages({});
  }

  const editingMessage = (messageId: string, messageText: string) => {
    setEditingMessageId(messageId);
    setMessageText(messageText);
    setInitialMessageText(messageText);
  };

  const deletingMessage = async (messagesIds: string[]) => {
    try {
        const numericMessageIds = messagesIds
            .map(id => Number(id))
            .filter(id => {
                const message = messages.find(message => message.id === id);
                return message?.created_by === profileData?.id;
            });

        if (numericMessageIds.length > 0) {
            await deleteMessage({
                message_ids: numericMessageIds,
                chat_id: chatId,
            }).unwrap();

            if (numericMessageIds.includes(+editingMessageId)) {
              cleanMessage();
            }
        } else {
            console.warn('Нет сообщений для удаления');
        }
    } catch (error) {
        console.error('Ошибка при удалении сообщений:', error);
    }

    cleanChoosingMessages();
  };

  useEffect(() => {
    const unreadMessageIds = messages
      .filter(message => message.created_by !== profileData?.id) 
      .filter(message => !message.read_at) 
      .map(message => message.id);

    if (unreadMessageIds.length > 0) {
      markMessagesAsRead({ ids: unreadMessageIds }).catch(err => {
        console.error('Ошибка при пометке сообщений как прочитанных:', err);
      });
    }
  }, [messages, markMessagesAsRead, profileData?.id]);


  const companionInfo = participants.find((el) => el.id !== profileData?.id);
  const reversedMessages = [...messages].reverse();

  const selectedMessagesCount = Object.values(checkedMessages).filter(Boolean).length;

  return (
    <div className="flex flex-col pl-[46px] w-full">
      {selectedMessagesCount > 0 && 
        <div className="w-full flex items-center mb-5 justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-regular leading-[18px]">{getMessageText(selectedMessagesCount)}</p>
          <img 
            src={close}
            alt="закрыть"
            className="w-6 h-6 cursor-pointer"
            onClick={cleanChoosingMessages}
          />
        </div>
        <div className="flex gap-3">
          <img 
            src={trash}
            alt="удалить"
            className="w-6 h-6 cursor-pointer"
            onClick={() => void deletingMessage(Object.keys(checkedMessages).filter(id => checkedMessages[id]))}
          />
          <img 
            src={favorites}
            alt="закрепить"
            className="w-6 h-6 cursor-pointer" 
          />
        </div>
      </div>
      }
      <div className="flex items-end justify-between w-full border-b-3 border-b-solid border-b-secondary-100 pb-[18px]">
        <figure className="flex items-center">
          <img
            className="w-[70px] aspect-square rounded-circle cursor-pointer"
            src={`https://storage.googleapis.com/meetups-dev/media/${companionInfo?.image_url}`}
            alt={`Аватар пользователя ${companionInfo?.username}`}
            onClick={() => navifate(`/profile/${companionInfo?.id}`)}
          />
          <figcaption className="flex flex-col ml-[22px]">
            <h2 
              className="text-[18px] rounded-circle font-medium leading-[23px] cursor-pointer"
              onClick={() => navifate(`/profile/${companionInfo?.id}`)}
            >
              {companionInfo?.username}
            </h2>
            <p className="text-main-violet-600 text-[14px] font-medium leading-[18px] relative mt-2 ml-[18px] before:absolute before:left-[-18px] before:top-1/2 before:translate-y-[-50%] before:rounded-circle before:w-2.5 before:aspect-square before:bg-main-violet-600">Онлайн</p>
          </figcaption>
        </figure>
        <SearchMessagesInput />
      </div>
      <div
        id="scrollableDiv"
        className="flex flex-col-reverse overflow-auto pt-[18px]">
        <InfiniteScroll
          dataLength={messages ? messages.length : 1}
          next={() => { return; }}
          hasMore={false}
          loader={<p>Loading...</p>}
          inverse={true}
          className="flex flex-col"
          scrollableTarget="scrollableDiv"
          style={{ overflow: 'auto' }}
        >
          {reversedMessages.map((el, index) => (
            <ChatMessage
              userImage={el.image_url}
              key={el.id}
              sender={participants.find((person) => person.id === el.created_by)}
              message={el}
              isOwner={el.created_by === profileData?.id}
              editingMessage={(id: string) => editingMessage(id, el.message_text)}
              choosingMessage={(id: string) => choosingMessage(id)}
              isCheckVisible={!!checkedMessages[el.id.toString()]}
              isNewDate={
                index > 0 && new Date(`${el.created_at.slice(0, 10)} 24:00`) >
                            new Date(`${messages[index - 1].created_at.slice(0, 10)} 24:00`)
              }
            />
          ))}
        </InfiniteScroll>
      </div>
      {editingMessageId && (
        <div className="w-full flex justify-between mt-auto items-center">
          <div className="flex flex-col pl-3 border-l-2 border-l-main-violet-600">
            <p className="text-[16px] text-main-violet-600">Редактирование</p>
            <p className="text-[16px] text-secondary-600">{initialMessageText}</p>
          </div>
          <img src={close} alt="отменить" className="cursor-pointer" onClick={cleanMessage} />
        </div>
      )}
      <Input
        value={messageText}
        onChange={(e) => handleInputChange(e, setMessageText)}
        type="text"
        size="lg"
        className={`text-[18px] ${editingMessageId ? 'mt-4' : 'mt-auto'}`}
        tail={<img className="cursor-pointer" src={send} alt="send" onClick={() => { void handleTailClick(); }}/>}
        extraInputClass="pl-3"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInterface;
