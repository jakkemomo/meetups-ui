import { ReactElement } from "react";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ContactCard } from "@/entities/chat/chatContact";
import { IChatDetails } from "@/entities/chat/model/types";

interface ContactsListProps {
  onChatSelect: (chatId: number) => void;
  chats: IChatDetails[];
  selectedChatId: number;
}

function ContactsList({ onChatSelect, chats, selectedChatId }: ContactsListProps): ReactElement {
  const reversedChats = [...chats].sort((a, b) => {
    const dateA = new Date(a.last_message_created_at);
    const dateB = new Date(b.last_message_created_at);
  
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }
  
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="max-w-[479px] w-full h-[569px] border-r-3 border-r-solid border-r-custom-gray pr-[45px]">
      <Input
        type="search"
        size="lg"
        head={<Svg id="search-icon-def" className="w-6 h-6" />}
        placeholder="Ищите переписки"
        extraInputClass="pl-3 placeholder:!text-placeholder-gray"
      />
      <InfiniteScroll
        className="flex flex-col gap-3.5 mt-[30px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-secondary-600 [&::-webkit-scrollbar-thumb]:rounded-[10px]"
        dataLength={chats.length}
        hasMore={false}
        next={() => console.log(chats.length)}
        loader={reversedChats.length !== 0 ? '' : <p>Loading...</p>}
        height={406}
      >
        {reversedChats.map((chat: IChatDetails) => (
          <ContactCard key={chat.id} data={chat} onClick={() => onChatSelect(chat.id)} isSelected={chat.id === selectedChatId}/>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ContactsList;
