import { ReactElement } from "react";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChatListQuery } from "@/entities/chat/api/chatsApi";
import { getChatsList } from "../model/getContactsList";

function ContactsList(): ReactElement {
  const {
    data: chats = {results : [] },
  } = useChatListQuery();

  const allChats = getChatsList(chats.results)

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
        className="flex flex-col gap-3.5 mt-[30px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]"
        dataLength={1}
        hasMore={false}
        next={() => console.log(allChats.length)}
        loader={allChats.length !== 0 ? '' : <p>Loading...</p>}
        height={406}
      >
        {allChats}
      </InfiniteScroll>
    </div>
  );
}

export default ContactsList;