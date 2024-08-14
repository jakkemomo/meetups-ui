import { ReactElement } from "react";

function ChatsEmptyState(): ReactElement {
  return (
    <div className="m-auto h-[500px] flex flex-col items-center justify-center">
        <p className="w-[860px] text-but text-center text-[24px] font-medium leading-def">У вас пока нет активных чатов. Чтобы начать разговор, перейдите на страницу другого пользователя и нажмите ‘Написать’.</p>
    </div>
  );
}

export default ChatsEmptyState;
