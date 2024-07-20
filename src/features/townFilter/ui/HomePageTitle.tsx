import { useGetCitiesQuery } from "@/entities/city/api/cityApi";
import { useMultipleGeocode } from "@/entities/city/model/useMultipleGeocode";
import { SelectInput } from "@/shared";
import { useLogServerError } from "@/shared/lib/hooks";
import { ISelectInputOptions } from "@/shared/model/types";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {ReactElement, useEffect, useState} from "react";

export function HomePageTitle(): ReactElement {
  const [options, setOptions] = useState<ISelectInputOptions[]>([]);
  const [selectedOption, setSelectedOption] = useState<ISelectInputOptions>({ name: '', id: ''});
  const [isGeocodeLoading, setIsGeocodeLoading] = useState(true);

  const {
    data: cities,
    isSuccess: isCitiesSuccess,
    isLoading: isCitiesLoading,
    isError: isCitiesError,
    error: citiesError
  } = useGetCitiesQuery();

  useLogServerError(isCitiesError, 'городов', citiesError);

  const geocoding = useMapsLibrary('geocoding');

  const { multipleGeocode } = useMultipleGeocode();

  useEffect(() => {
    if (!isCitiesSuccess || !geocoding || options.length) return;

    const geocoder = new geocoding.Geocoder();

    multipleGeocode(cities.results, geocoder)
      .then((res) => {
        setOptions(res);
        setSelectedOption(res[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsGeocodeLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCitiesSuccess]);

  return (
    <div className="flex items-center mt-14">
      <h1 className="text-[45px] text-text-black font-semibold leading-normal">Куда сходить в&nbsp;</h1>
      {
        isGeocodeLoading || isCitiesLoading ? (
          <></>
        ) : (
          <SelectInput
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            extraContentClass="bg-transparent w-[unset] !text-[45px] text-text-black font-semibold !px-2 underline"
            extraDropdownClass="w-[unset] pr-[22px] !text-[25px] leading-[33px] text-text-black font-medium max-h-[400px] top-[50px]"
          />
        )
      }
    </div>
  );
}
