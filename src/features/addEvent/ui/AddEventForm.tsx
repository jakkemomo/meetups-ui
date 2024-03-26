import {ReactElement, ReactNode} from "react";

interface IAddEventFormProps {
  children: ReactNode;
}

export function AddEventForm({ children }: IAddEventFormProps): ReactElement {
  return (
    <form noValidate className="flex flex-col scrollbar">
      {children}
      <button type="submit" className="self-start h-[44px] w-[165px] bg-button-purple text-[18px] font-semibold text-white rounded-[10px] mt-10 duration-150 hover:opacity-70">Создать</button>
    </form>
  )
}
