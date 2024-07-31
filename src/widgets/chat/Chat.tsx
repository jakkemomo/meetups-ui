import { ChatInterface, ContactsList } from "@/features/chat";
import { ReactElement, useState } from "react";

function Chat(): ReactElement {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);

  return (
    <div className="flex justify-start mt-5 max-h-[569px]">
      <ContactsList onChatSelect={setSelectedChatId}/>
      {selectedChatId !== 0  ?
        <ChatInterface chatId={selectedChatId}/>
        : <></>
      }
    </div>
  )
}

export default Chat;
