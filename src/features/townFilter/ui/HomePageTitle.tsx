import { useGetAvailableCitiesQuery } from "@/entities/cities/api/citiesApi";
import { citySetted } from "@/features/searchFilter/model/SearchFilterSlice";
import { useLogServerError } from "@/shared/lib/hooks";
import { useAppDispatch } from "@/shared/model";
import { ISelectInputOptions } from "@/shared/model/types";
import Svg from "@/shared/ui/Svg";
import { Listbox } from "@headlessui/react";
import {Fragment, ReactElement, useEffect, useState} from "react";

export function HomePageTitle(): ReactElement {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<ISelectInputOptions[]>([]);

  const [selectedOption, setSelectedOption] = useState<ISelectInputOptions | null>(null);

  const {
    data: cities={results: []},
    isSuccess: isCitiesSuccess,
    isError: isCitiesError,
    error: citiesError
  } = useGetAvailableCitiesQuery({});

  useLogServerError(isCitiesError, 'городов', citiesError);

  useEffect(() => {
    if (isCitiesSuccess) {
      const mappedCities = cities.results.map((city) => ({ id: city.id, name: city.name }));

      setOptions(mappedCities);
      setSelectedOption(mappedCities[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const onSelectedOptionChange = (option: ISelectInputOptions) => {
    setSelectedOption(option);

    void dispatch(citySetted(Number(option.id)));
  }

  return (
    <div className="flex items-start relative mt-[75px] h-11">
      <Listbox
        as={Fragment}
        value={selectedOption}
        onChange={onSelectedOptionChange}
        name="assignee"
      >
        {({ open, value }) => (
          <>
            <Listbox.Button
              className={`group bg-secondary-100 rounded-[10px] flex justify-between items-center text-lg bg-transparent w-[unset] !text-[45px] text-text-black font-semibold duration-150 hoverscreen:hover:text-main-violet-600`}
            >
              <h1>Куда сходить в&nbsp;</h1>
              <p className="underline decoration-[1.5px] underline-offset-4">{value?.name ?? ''}</p>
              <Svg
                id="selector-chevron"
                className={`w-6 h-6 transition ease-in-out ml-2 mt-1 duration-150 hoverscreen:group-hover:!stroke-main-violet-600 stroke-text-black ${open ? 'rotate-180': 'rotate-00'}`}
              />
            </Listbox.Button>
            <Listbox.Options
              as='div'
              className={`flex flex-col bg-white shadow-select rounded-[20px] translate-x-[-2%] py-3 mt-3 absolute z-10 gap-2 left-0 overflow-y-auto scrollbar w-full !text-[25px] leading-[33px] text-text-black font-medium max-h-[400px] top-[50px]`}
            >
              {options.map((option) => (
                <Listbox.Option
                  as='div'
                  key={option.id}
                  value={option}
                  className={'text-[20px] cursor-pointer pl-[22px] hoverscreen:hover:bg-secondary-200 py-2'}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}
