import { ReactElement, useEffect, useMemo, useState, useCallback } from "react";
import { useAppSelector } from "@/shared/model";
import { useAllChatListQuery, useChatListQuery, useChatMessagesQuery, useChatParticipantsQuery } from "@/entities/chat/api/chatsApi";
import ContactCardSkeleton from "@/entities/chat/chatContact/ui/ContactCardSkeleton";
import ChatMessageSkeleton from "@/entities/chat/chatMessage/ui/ChatMessageSkeleton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ChatInterface, ContactsList } from "@/features/chat";
import ChatsState from "@/features/chat/ui/ChatsState";
import { ChatsStateType } from "@/features/chat/model/types";

// const pageSize = 10;

function Chat(): ReactElement {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  // const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isChatChanging, setIsChatChanging] = useState<boolean>(false);
  // const [offset, setOffset] = useState(0);

  const { searchChats } = useAppSelector(state => state.searchChats);
  const { search } = useAppSelector(state => state.searchMessages);

  const { data: currentProfileData } = useMyDetailsQuery();
  const userIdKey = useMemo(() => `selectedChatId_${currentProfileData?.id}`, [currentProfileData?.id]);

  const { 
    data: allChats = { results: [] } 
  } = useAllChatListQuery({ search: searchChats });

  const { 
    data: chats = { results: [] }, 
    isLoading: isChatsLoading, 
    isError: isChatsError 
  } = useChatListQuery();

  const { 
    data: participants = { results: [] } 
  } = useChatParticipantsQuery({
     chat_id: String(selectedChatId) 
  }, {
     skip: !selectedChatId 
  });

  const {  
    data: messages = { results: [] },
    isError: isMessagesError 
  } = useChatMessagesQuery({
    search: search,
    chat_id: String(selectedChatId),
  }, { skip: !selectedChatId });

  useEffect(() => {
    const storedChatId = localStorage.getItem(userIdKey);
    if (storedChatId) {
      setSelectedChatId(JSON.parse(storedChatId) as number);
    }
  }, [userIdKey]);

  const selectChatId = useCallback((newChatId: number) => {
    if (newChatId !== selectedChatId) {
      setIsChatChanging(true);
      setSelectedChatId(newChatId);
      localStorage.setItem(userIdKey, JSON.stringify(newChatId));
    }
  }, [selectedChatId, userIdKey]);

  useEffect(() => {
    if (messages) {
      setIsChatChanging(false)
    }
  }, [messages]);
  

  // const handleOffset = useCallback(() => {
  //   if (offset + pageSize < messagesData.count) {
  //     setOffset(prevOffset => prevOffset + pageSize);
  //   }
  // }, [offset, messagesData.count]);

  if (isChatsLoading) return <ContactCardSkeleton />;

  if (isChatsError) return <ChatsState type={ChatsStateType.error} />;

  if (chats.results.length === 0 && !isChatsError) {
    return <ChatsState type={ChatsStateType.empty} />;
  }

  const chatsToDisplay = searchChats ? allChats.results : chats.results;

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList
        chats={chatsToDisplay}
        onChatSelect={selectChatId}
        selectedChatId={selectedChatId}
        type={searchChats ? 'search' : 'default'}
      />
      {isChatChanging ? (
        <ChatMessageSkeleton />
      ) : (
        selectedChatId !== 0 && (
          isMessagesError ? (
            <div className="text-red-500 text-center pt-[20%]">
              Произошла ошибка при попытке загрузить сообщения. Пожалуйста, проверьте ваше интернет соединение.
            </div>
          ) : (
            <ChatInterface
              messages={messages.results}
              participants={participants.results}
              chatId={selectedChatId}
              // handleOffset={handleOffset}
              // hasMore={offset + pageSize < messagesData.count}
            />
          )
        )
      )}
    </div>
  );
}

export default Chat;
