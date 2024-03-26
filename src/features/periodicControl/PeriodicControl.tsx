import { CheckboxWithValue } from "@/shared";
import { Disclosure } from "@headlessui/react";
import { ChangeEvent, ReactElement, useState } from "react";
import { DateInput, DateSegment, TimeField } from "react-aria-components";

const days = [
  { id: 1, day: 'ПН' },
  { id: 2, day: 'ВТ' },
  { id: 3, day: 'СР' },
  { id: 4, day: 'ЧТ' },
  { id: 5, day: 'ПТ' },
  { id: 6, day: 'СБ' },
  { id: 7, day: 'ВС' }
]

export function PeriodicControl(): ReactElement {
  const [isPeriodic, setIsPeriodic] = useState(false);

  const handlePeriodic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPeriodic(e.target.checked);
  }

  return (
    <Disclosure>
      {
        ({ open, close }) => (
          <>
            <CheckboxWithValue
              id="periodic"
              value="Периодическое мероприятие"
              extraLabelClass="text-[20px] ml-2.5"
              onChangeFunc={(e) => {handlePeriodic(e); close()}}
            />
            <Disclosure.Button className={`flex items-center text-[18px] leading-[22.59px] py-[10px] w-full text-start px-[22px] mt-[7px] ${isPeriodic ? "bg-custom-gray" : "text-white bg-select-disable"} ${open ? "rounded-t-[10px] pt-[20px]" : "rounded-[10px]"}`} disabled={!isPeriodic}>
              Настройки
              <div className={`w-6 h-6 bg-no-repeat bg-center ml-auto ${isPeriodic ? "bg-chevron-down-black" : "bg-chevron-down-white"} ${open && "rotate-180"}`}></div>
            </Disclosure.Button>
            <Disclosure.Panel className={'flex pt-[7px] px-[22px] pb-5 bg-custom-gray rounded-b-[10px]'}>
              <div className="flex flex-col text-[18px] pt-[11px]">
                <p>Проводится каждый:</p>
                <p className="mt-[10px]">Время:</p>
              </div>
              <ul className="flex items-center ml-[22px]">
                {
                  days.map((el, index) => (
                    <li key={index} className="flex flex-col items-center ml-1 first-of-type:ml-0">
                      <div className="flex items-center justify-center w-[45px] h-[45px] border-1 border-main-violet border-solid rounded-[10px] cursor-pointer">
                        <p className="font-medium uppercase">{el.day}</p>
                      </div>
                      <TimeField className="mt-0.5 w-[53px]">
                        <DateInput className="flex border-1 border-solid border-black rounded-[8px] px-1.5 py-0.5">
                          {segment => <DateSegment className="font-medium text-text-light-gray outline-none tracking-wider focus:bg-main-violet focus:rounded-[5px]" segment={segment} />}
                        </DateInput>
                      </TimeField>
                    </li>
                  ))
                }
              </ul>
              <div className="w-6 h-6 bg-edit-pen-icon bg-no-repeat bg-center self-end ml-2 cursor-pointer"></div>
            </Disclosure.Panel>
          </>
      )
      }
    </Disclosure>
  )
}
