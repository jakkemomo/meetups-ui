import { SelectInput } from "@/shared";
import { ReactElement } from "react";

const typeOfEvent = [
  { id: 1, name: 'Публичное', unavailable: false },
  { id: 2, name: 'По ссылке', unavailable: false },
]

export function AccessControl(): ReactElement {
  return (
    <div className="flex flex-col">
    <SelectInput
      labelText='Доступ к мероприятию'
      options={typeOfEvent}
      placeholder='Публичное/по ссылке'
      extraBoxClass="mt-[18px]"
    />
    <div className="flex items-center py-2.5 px-3.5 text-white bg-select-disable h-[44px] w-[133px] mt-2.5 rounded-[10px]">
      <div className="w-6 h-6 bg-link-icon bg-no-repeat bg-center"></div>
      <p className="text-[18px] font-semibold ml-2">Ссылка</p>
    </div>
  </div>
  )
}
