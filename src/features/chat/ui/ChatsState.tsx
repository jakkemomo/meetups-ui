import { ReactElement } from "react";
import { IChatsStateProps } from "../model/types";
import { text } from "../model/constants";

function ChatsState({type}: IChatsStateProps): ReactElement {
  return (
    <div className="m-auto h-[500px] flex flex-col items-center justify-center">
        <p className="w-[860px] text-but text-center text-[24px] font-medium leading-def">{text[type]}</p>
    </div>
  );
}

export default ChatsState;
