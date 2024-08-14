import { useChatListQuery, useChatMessagesQuery, useChatParticipantsQuery } from "@/entities/chat/api/chatsApi";
import ContactCardSkeleton from "@/entities/chat/chatContact/ui/ContactCardSkeleton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ChatInterface, ContactsList } from "@/features/chat";
import ChatsEmptyState from "@/features/chat/ui/ChatsEmptyState";
import { ReactElement, useEffect, useState } from "react";

function Chat(): ReactElement {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

  const {
    data: currentProfileData
  } = useMyDetailsQuery();

  const {
    data: chats = { results: [] },
    isLoading: isChatsLoading
  } = useChatListQuery();
  
  const {
    data: participants = { results: [] }
  } = useChatParticipantsQuery({
    chat_id: String(selectedChatId),
  });

  const {
    data: messages = { results: [] },
    isLoading: isMessagesLoading,
    isError: isMessagesError
  } = useChatMessagesQuery({
    chat_id: String(selectedChatId),
  });

  useEffect(() => {
    const userIdKey = `selectedChatId_${currentProfileData?.id}`;
    const chatId = localStorage.getItem(userIdKey);
    if (chatId) {
      const storedChatId = JSON.parse(chatId) as number;
      if (storedChatId) {
        setSelectedChatId(storedChatId);
      }
    }
  }, [currentProfileData?.id]);

  const selectChatId = (newChatId: number) => {
    if (newChatId === selectedChatId) {
      return;
    }
    setSelectedChatId(newChatId);
    setIsLoadingMessages(true); 
    const userIdKey = `selectedChatId_${currentProfileData?.id}`;
    localStorage.setItem(userIdKey, JSON.stringify(newChatId));
  };

  useEffect(() => {
    if (selectedChatId !== 0) {
      setIsLoadingMessages(isMessagesLoading);
    }
  }, [isMessagesLoading, selectedChatId]);

  useEffect(() => {
    if (!isMessagesLoading && selectedChatId !== 0) {
      setIsLoadingMessages(false);
    }
  }, [isMessagesLoading, selectedChatId]);

  if (chats.results.length === 0 && !isChatsLoading) {
    return <ChatsEmptyState />;
  }

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList 
        chats={chats.results}
        onChatSelect={selectChatId}
        selectedChatId={selectedChatId}
      />
      {isLoadingMessages && <ContactCardSkeleton />}
      {selectedChatId !== 0 && !isLoadingMessages ? (
        isMessagesError ? (
          <div className="text-red-500 text-center pt-[20%]">
            Произошла ошибка при попытке загрузить сообщения. Пожалуйста, проверьте ваше интернет соединение.
          </div>
        ) : (
          <ChatInterface
            messages={messages.results}
            participants={participants.results}
            chatId={selectedChatId}
          />
        )
      ) : null}
    </div>
  );
}

export default Chat;
