import { useLazyGetCitiesQuery } from "@/entities/cities/api/citiesApi";
import { ICity } from "@/entities/cities/model/types";
import { LabeledInput } from "@/shared";
import { ChangeEvent, useEffect, useState } from "react";
import { ILabeledInputProps } from "./LabeledInput";

interface ICityInput extends ILabeledInputProps {
  onFormValueChange: (city: ICity | null) => void;
  extraClass?: string;
  cityValue: string | null;
}

export function CityInput({
  onFormValueChange,
  extraClass,
  cityValue,
  ...other
}: ICityInput) {
  const [inputValue, setInputValue] = useState('');
  const [cities, setCities] = useState<ICity[]>([]);

  const [getCities] = useLazyGetCitiesQuery();

  useEffect(() => {
    if (cityValue) {
      setInputValue(cityValue);
    }
  }, [cityValue])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value.length === 0) {
      onFormValueChange(null);
      setCities([]);
    }

    if (e.target.value.length < 2) return;

    getCities({ search: e.target.value })
      .unwrap()
      .then((res) => {
        setCities(res.results);
      })
      .catch((err) => console.log(err))
  }

  const onSuggestionClick = (city: ICity) => {
    onFormValueChange(city);
    setInputValue(city.name);
    setCities([]);
  }

  return (
    <div className={`relative ${extraClass ?? ''}`}>
      <LabeledInput
        {...other}
        value={inputValue}
        onChange={onInputChange}
        type="search"
        className="w-full mt-[7px]"
        size="lg"
        autoComplete="nope"
        extraLabelClass="text-[20px]"
      />
      {cities.length > 0 && (
        <ul className="w-full flex flex-col absolute top-[90px] bg-secondary-100 rounded-[10px] z-50">
          {cities.map((city) => {
            return (
              <li
                key={city.id}
                className="px-2 py-1.5 cursor-pointer hover:bg-secondary-100 rounded-[10px]"
                onClick={() => onSuggestionClick(city)}
              >
                {city.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
}
