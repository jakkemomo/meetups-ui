import { ReactElement, useMemo, useCallback } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ContactCard } from "@/entities/chat/chatContact";
import { IChatDetails, IChatMessage } from "@/entities/chat/model/types";
import { SearchChatsInput } from "@/features/searchChats/ui/SearchChatsInput";

interface ContactsListProps {
  onChatSelect: (chatId: number) => void;
  chats: IChatDetails[];
  selectedChatId: number;
  type: string;
}

const ContactsList = ({ onChatSelect, chats, selectedChatId, type }: ContactsListProps): ReactElement => {

  const sortedChats = useMemo(() => {
    console.log(chats)
    return [...chats].sort((a, b) => {
      const dateA = new Date(a.last_message_created_at);
      const dateB = new Date(b.last_message_created_at);
      return dateB.getTime() - dateA.getTime();
    });

  }, [chats]);

  const handleChatSelect = useCallback((chat: IChatDetails | IChatMessage) => {
    const chatId = type === 'search' ? (chat as IChatMessage).chat : (chat as IChatDetails).id;
    onChatSelect(chatId);
  }, [onChatSelect, type]);
  

  return (
    <div className="max-w-[479px] w-full h-[569px] border-r-3 border-r-solid border-r-custom-gray pr-[45px]">
      <SearchChatsInput />
        <InfiniteScroll
          className="flex flex-col gap-3.5 mt-[30px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-secondary-600 [&::-webkit-scrollbar-thumb]:rounded-[10px]"
          dataLength={chats.length}
          hasMore={false}
          next={() => console.log(chats.length)}
          loader={sortedChats.length !== 0 ? '' : <p>Loading...</p>}
          height={406}
        >
        {sortedChats.map((chat: IChatDetails | IChatMessage) => (
          <ContactCard 
            key={chat.id} 
            type={type} 
            data={chat}
            onClick={() => handleChatSelect(chat)}
            isSelected={chat.id === selectedChatId}
          />
        ))}
        </InfiniteScroll>
    </div>
  );
};

export default ContactsList;
