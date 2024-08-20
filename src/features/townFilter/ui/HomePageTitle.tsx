import { useGetAvailableCitiesQuery } from "@/entities/cities/api/citiesApi";
import { citySetted } from "@/features/searchFilter/model/SearchFilterSlice";
import { SelectInput } from "@/shared";
import { useLogServerError } from "@/shared/lib/hooks";
import { useAppDispatch } from "@/shared/model";
import { ISelectInputOptions } from "@/shared/model/types";
import {ReactElement, useEffect, useState} from "react";

export function HomePageTitle(): ReactElement {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState<ISelectInputOptions[]>([]);
  const [isTitleReady, setIsTitleReady] = useState(false);

  const {
    data: cities={results: []},
    isSuccess: isCitiesSuccess,
    isLoading: isCitiesLoading,
    isError: isCitiesError,
    error: citiesError
  } = useGetAvailableCitiesQuery({});

  useLogServerError(isCitiesError, 'городов', citiesError);

  useEffect(() => {
    if (isCitiesSuccess) {
      const mappedCities = cities.results.map((city) => ({ id: city.id, name: city.name }));

      setOptions(mappedCities);

      setIsTitleReady(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const onSelectedOptionChange = (option: ISelectInputOptions) => {
    void dispatch(citySetted(Number(option.id)));
  }

  return (
    <div className="flex items-center mt-14">
      <h1 className="text-[45px] text-text-black font-semibold leading-normal">Куда сходить в&nbsp;</h1>
      {
        isCitiesLoading || !isTitleReady ? (
          <></>
        ) : (
          <SelectInput
            options={options}
            onChange={onSelectedOptionChange}
            extraContentClass="bg-transparent w-[unset] !text-[45px] text-text-black font-semibold !px-2 underline"
            extraDropdownClass="w-full pr-[22px] !text-[25px] leading-[33px] text-text-black font-medium max-h-[400px] top-[50px]"
          />
        )
      }
    </div>
  );
}
