import { ReactElement } from "react";
import { roomInfo } from "../model/contants";
import { IUser } from "../model/types";
import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatMessage } from "@/entities/chat/chatMessage";

function ChatInterface(): ReactElement {
  const companionInfo: IUser | undefined = roomInfo.participants.find((el) => el.user_id === 1);

  return (
    <div className="flex flex-col pl-[46px] w-full">
      <div className="flex items-end w-full border-b-3 border-b-solid border-b-custom-gray pb-[18px]">
        <figure className="flex items-center">
          <img className="w-[70px] aspect-square rounded-circle" src="https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp" alt={`Аватар пользователя ${companionInfo?.username}`} />
          <figcaption className="flex flex-col ml-[22px]">
            <h2 className="text-[18px] font-medium leading-[23px]">{companionInfo?.username}</h2>
            <p className="text-but-primary text-[14px] font-medium leading-[18px] relative mt-2 ml-[18px] before:absolute before:left-[-18px] before:top-1/2 before:translate-y-[-50%] before:rounded-circle before:w-2.5 before:aspect-square before:bg-but-primary">Онлайн</p>
          </figcaption>
        </figure>
        <Input
          type="search"
          placeholder="Ищите в диалоге"
          head={<Svg id="search-icon-def" className="w-6 h-6"/>}
          className="!bg-transparent ml-auto mb-2 max-w-[180px]"
          extraInputClass="pl-[9px] placeholder:!text-placeholder-gray"
        />
      </div>
      <div id="scrollableDiv" className="flex flex-col-reverse overflow-auto pt-[18px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]">
        <InfiniteScroll
          dataLength={roomInfo.messages.length}
          next={() => { return }}
          hasMore={false}
          loader={<p>Loading...</p>}
          className="flex flex-col"
          scrollableTarget="scrollableDiv"
        >
          {roomInfo.messages.map((el, index) => (
            <ChatMessage
              key={index}
              sender={roomInfo.participants.find((person) => person.user_id === el.created_by)}
              message={el} isOwner={el.created_by === 2}
              isNewDate={index > 0 ? new Date(`${el.created_at.slice(0, 10)} 24:00`) > new Date(`${roomInfo.messages[index - 1].created_at.slice(0, 10)} 24:00`) : false}
            />
          ))}
        </InfiniteScroll>
      </div>
      <Input
        type="text"
        size="lg"
        className="mt-auto text-[18px]"
        head={<Svg className="w-6 h-6 hoverscreen:hover:opacity-70 duration-150 cursor-pointer" id="chat-input-paperclip" />}
        tail={<Svg className="w-6 h-6 hoverscreen:hover:opacity-70 duration-150 cursor-pointer" id="chat-input-send-button" />}
        extraInputClass="pl-3"
      />
    </div>
  )
}

export default ChatInterface;
