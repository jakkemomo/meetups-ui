import { Input } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { PageTitle } from "@/widgets/PageTitle";
import { textAccordingType } from "@/widgets/userEvents/model/constants";
import { CreatedEvents } from "@/widgets/userEvents/ui/CreatedEvents";
import { EventsContainer } from "@/widgets/userEvents/ui/EventsContainer";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";

interface IUserEventsPage {
  type: 'favorite' | 'planned' | 'created';
}

export function UserEventsPage({ type }: IUserEventsPage) {
  const [inputValue, setInputValue] = useState('');

  const [debouncedValue] = useDebounce(inputValue, 700);

  return (
    <main className="bg-white w-full min-h-screen flex flex-col pb-[66px]">
      <PageTitle title={textAccordingType.find((el) => el.type === type)?.title} />
      <Input
        type="text"
        head={<Svg className="w-6 h-6" id="search-icon-def" />}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        value={inputValue}
        size="lg"
        className="max-w-[434px] w-full max-h-11 text-[16px] mt-4 mb-[30px]"
        placeholder={`Ищите среди ${textAccordingType.find((el) => el.type === type)?.placeholder}`}
        extraInputClass="pl-3"
      />
      {
        (type === 'favorite' || type === 'planned') && (
          <EventsContainer debounedInputValue={debouncedValue} type={type} />
        )
      }
      {
        type === 'created' && (
          <CreatedEvents debounedInputValue={debouncedValue} />
        )
      }
    </main>
  )
}
