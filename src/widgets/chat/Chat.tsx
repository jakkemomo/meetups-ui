import { useChatListQuery } from "@/entities/chat/api/chatsApi";
import ContactCardSkeleton from "@/entities/chat/chatContact/ui/ContactCardSkeleton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ChatInterface, ContactsList } from "@/features/chat";
import ChatsEmptyState from "@/features/chat/ui/ChatsEmptyState";
import { ReactElement, useEffect, useState } from "react";

function Chat(): ReactElement {
  const {
    data: currentProfileData,
  } = useMyDetailsQuery();
  
  const {
    data: chats = {results: []},
    refetch
  } 
  = useChatListQuery();

  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  const [isRefetched, setIsRefetched] = useState<boolean>(false);

  const selectChatId = (selectedChatId: number) => {
    setSelectedChatId(selectedChatId);
    const userIdKey = `selectedChatId_${currentProfileData?.id}`;
    localStorage.setItem(userIdKey, JSON.stringify(selectedChatId));
  }

  useEffect(() => {
    const userIdKey = `selectedChatId_${currentProfileData?.id}`;
    const chatId = localStorage.getItem(userIdKey);
    if (!chatId) { return }
    const selectedChatId = JSON.parse(chatId) as number;
    if (selectedChatId) {
      setSelectedChatId(selectedChatId);
    }
  }, [currentProfileData?.id]);


  useEffect(() => {
    if (!isRefetched) {
      void refetch().then(() => setIsRefetched(true));
    }
  }, [isRefetched, refetch]);

  if (!isRefetched) {
    return <ContactCardSkeleton />;
  }

  if(chats.results.length === 0) {
    return <ChatsEmptyState />
  }

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList chats={chats.results} onChatSelect={selectChatId}/>
      {selectedChatId !== 0  ?
        <ChatInterface chatId={selectedChatId}/>
        : <></>
      }
    </div>
  )
}

export default Chat;