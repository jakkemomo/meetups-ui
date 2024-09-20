import { Chat } from "@/widgets/chat";
import { PageTitle } from "@/widgets/PageTitle";
import { ReactElement } from "react";

function ChatPage(): ReactElement {
  return (
    <main className="w-full max-w-[1215px] mx-auto pb-[76px]">
      <PageTitle title="Чат" />
      <Chat />
    </main>
  )
}

export default ChatPage;
