import { ReactElement, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/shared/model";
import { useChatListQuery, useChatMessagesQuery, useChatParticipantsQuery } from "@/entities/chat/api/chatsApi";
import ContactCardSkeleton from "@/entities/chat/chatContact/ui/ContactCardSkeleton";
import ChatMessageSkeleton from "@/entities/chat/chatMessage/ui/ChatMessageSkeleton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ChatInterface, ContactsList } from "@/features/chat";
import { ChatsStateType } from "@/features/chat/model/types";
import ChatsState from "@/features/chat/ui/ChatsState";
import { IChatMessage } from "@/entities/chat/model/types";

function Chat(): ReactElement {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isChatChanging, setIsChatChanging] = useState<boolean>(false);

  //может быть есть какой-то вариант гораздо лучше, но пока у меня такой костыль🥲
  const [offset, setOffset] = useState(0);
  const pageSize = 10;

  const { search } = useAppSelector(state => state.searchMessages);

  const {
    data: currentProfileData
  } = useMyDetailsQuery();

  const {
    data: chats = { results: [] },
    isLoading: isChatsLoading,
    isError: isChatsError,
  } = useChatListQuery();
  
  const {
    data: participants = { results: [] },
  } = useChatParticipantsQuery({
    chat_id: String(selectedChatId),
  },
  {
    skip: !selectedChatId
});

  const {
    data: messagesData = {count: 0, next: null, results: []},
    isError: isMessagesError,
  } = useChatMessagesQuery({
    search: search,
    offset,
    limit: pageSize,
    chat_id: String(selectedChatId),
  },
  {
    skip: !selectedChatId
  });

  const userIdKey = useMemo(() => `selectedChatId_${currentProfileData?.id}`, [currentProfileData?.id]);

  useEffect(() => {
    const chatId = localStorage.getItem(userIdKey);
    if (chatId) {
      setSelectedChatId(JSON.parse(chatId) as number);
    }
  }, [userIdKey]);

  const selectChatId = (newChatId: number) => {
    if (newChatId === selectedChatId) return;

    setIsChatChanging(true);
    setSelectedChatId(newChatId);
    //и вот здесь
    setOffset(0);
    setMessages([]);
    localStorage.setItem(userIdKey, JSON.stringify(newChatId));
  };

  useEffect(() => {
    if (messagesData.results.length > 0) {
      setMessages(prevMessages => {
        const newMessages = messagesData.results.filter(newMsg => 
          !prevMessages.some(prevMsg => prevMsg.id === newMsg.id)
        );
        return [...prevMessages, ...newMessages];
      });
    }
    setIsChatChanging(false);
  }, [messagesData]);

  const handleOffset = () => {
    if (offset + pageSize < messagesData.count) {
      setOffset(prevState => prevState + pageSize);
    }
  };

  if (isChatsLoading) {
    return <ContactCardSkeleton />;
  }

  if (chats.results.length === 0 && !isChatsError ) {
    return <ChatsState type={ChatsStateType.empty}/>;
  }

  if (isChatsError ) {
    return <ChatsState type={ChatsStateType.error}/>;
  }

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList 
        chats={chats.results}
        onChatSelect={selectChatId}
        selectedChatId={selectedChatId}
      />
      {isChatChanging && <ChatMessageSkeleton />}
      {!isChatChanging && selectedChatId !== 0 && (
        isMessagesError ? (
          <div className="text-red-500 text-center pt-[20%]">
            Произошла ошибка при попытке загрузить сообщения. Пожалуйста, проверьте ваше интернет соединение.
          </div>
        ) : (
          <ChatInterface
            messages={messages}
            participants={participants.results}
            chatId={selectedChatId}
            handleOffset={handleOffset}
            hasMore={offset + pageSize < messagesData.count}
          />
        )
      )}
    </div>
  );
}

export default Chat;
