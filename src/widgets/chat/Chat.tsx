import { useChatListQuery, useChatMessagesQuery, useChatParticipantsQuery } from "@/entities/chat/api/chatsApi";
import ContactCardSkeleton from "@/entities/chat/chatContact/ui/ContactCardSkeleton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ChatInterface, ContactsList } from "@/features/chat";
import ChatsEmptyState from "@/features/chat/ui/ChatsEmptyState";
import { ReactElement, useEffect, useState } from "react";

function Chat(): ReactElement {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  const {
    data: currentProfileData,
  } = useMyDetailsQuery();
  
  const {
    data: chats = {results: []},
  } 
  = useChatListQuery();

  const { 
    data: participants = {results: []},
  } = useChatParticipantsQuery({
    chat_id: String(selectedChatId),
  });

  const {
    data: messages = {results: []},
    isLoading: isMessagesLoading
    ,
  } = useChatMessagesQuery({
    chat_id: String(selectedChatId),
  });


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

  if (isMessagesLoading) {
    return <ContactCardSkeleton />;
  }

  if(chats.results.length === 0) {
    return <ChatsEmptyState />
  }

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList chats={chats.results} onChatSelect={selectChatId}/>
      {selectedChatId !== 0  ?
        <ChatInterface messages={messages.results} participants={participants.results} chatId={selectedChatId}/>
        : <></>
      }
    </div>
  )
}

export default Chat;