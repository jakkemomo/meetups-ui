import { ChangeEvent, ReactElement, useState, KeyboardEvent } from "react";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import send from '../../../../public/images/send.svg'
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatMessage } from "@/entities/chat/chatMessage";
import { useSendMessageMutation } from "@/entities/chat/api/chatsApi";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { IChatMessage, Participant } from "@/entities/chat/model/types";
interface ContactsListProps {
  chatId: number;
  messages: IChatMessage[];
  participants: Participant[];
}

const ChatInterface = ({ chatId, messages, participants }: ContactsListProps): ReactElement => {

  const {
    data: profileData 
  } = useMyDetailsQuery();

  const [messageText, setMessageText] = useState<string>('');

  const [sendMessage] = useSendMessageMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleTailClick = async () => {
    if (messageText.trim() !== '') {
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
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleTailClick();
    }
  };
    const companionInfo = participants.find((el) => el.id !== profileData?.id);
    const reversedMessages = [...messages].reverse();

    return (
      <div className="flex flex-col pl-[46px] w-full">
        <div className="flex items-end w-full border-b-3 border-b-solid border-b-custom-gray pb-[18px]">
          <figure className="flex items-center">
            <img className="w-[70px] aspect-square rounded-circle" src={`https://storage.googleapis.com/meetups-dev/media/${companionInfo?.image_url}`} alt={`Аватар пользователя ${companionInfo?.username}`} />
            <figcaption className="flex flex-col ml-[22px]">
              <h2 className="text-[18px] font-medium leading-[23px]">{companionInfo?.username}</h2>
              <p className="text-but-primary text-[14px] font-medium leading-[18px] relative mt-2 ml-[18px] before:absolute before:left-[-18px] before:top-1/2 before:translate-y-[-50%] before:rounded-circle before:w-2.5 before:aspect-square before:bg-but-primary">Онлайн</p>
            </figcaption>
          </figure>
          <Input
            type="search"
            placeholder="Ищите в диалоге"
            head={<Svg id="search-icon-def" className="w-6 h-6" />}
            className="!bg-transparent ml-auto mb-2 max-w-[180px]"
            extraInputClass="pl-[9px] placeholder:!text-placeholder-gray" />
        </div>
        <div id="scrollableDiv" className="flex flex-col-reverse overflow-auto pt-[18px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]">
          <InfiniteScroll
            dataLength={messages ? messages.length : 1}
            next={() => { return; } }
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
                message={el} isOwner={el.created_by === profileData?.id}
                isNewDate={index > 0 ? new Date(`${el.created_at.slice(0, 10)} 24:00`) > new Date(`${messages[index - 1].created_at.slice(0, 10)} 24:00`) : false} />
            ))}
          </InfiniteScroll>
        </div>
          <Input
            value={messageText}
            onChange={handleInputChange}
            type="text"
            size="lg"
            className="mt-auto text-[18px]"
            tail={<img className="cursor-pointer" src={send} alt="send" />}
            extraInputClass="pl-3"
            onTailClick={() => { void handleTailClick(); }}
            onKeyDown={handleKeyDown}
          />
      </div>
    )
  }

export default ChatInterface;
