import { LabeledInput } from "@/shared";
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function CityInput(): ReactElement {
  const {
    formState: { errors },
    getValues
  } = useFormContext<EditProfileValidationSchema>();

  const [inputValue, setInputValue] = useState('');
  const [predictionResults, setPredictionResults] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);

  const places = useMapsLibrary('places');

  const cityValue = getValues('city');

  useEffect(() => {
    setInputValue(cityValue);
  }, [cityValue]);

  useEffect(() => {
    if (!places) return;

    setAutocompleteService(new places.AutocompleteService());
  }, [places]);

  const fetchPredictions = async (inputValue: string) => {
    if (!autocompleteService || !inputValue) {
      setPredictionResults([]);
      return;
    }

    const request: google.maps.places.AutocompletionRequest = {input: inputValue, types: ['locality']};
    const response = await autocompleteService.getPlacePredictions(request);

    return response;
  }

  const handleSuggestionClick = (description: string, place_id: string) => {
    setInputValue(description);

    setPredictionResults([]);
  }

  const onInputChange = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement)?.value;

    setInputValue(value);

    fetchPredictions(value)
      .then((res) => res && setPredictionResults(res.predictions))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-[480px] relative">
      <LabeledInput
        value={inputValue}
        onChange={onInputChange}
        type="search"
        isError={!!errors.city?.message}
        placeholder="Введите свой город"
        maxLength={30}
        className="text-[18px] w-[480px] mt-[7px] h-11"
        labelText="Местоположение"
        extraLabelClass="text-[20px] mt-[18px]"
        size="lg"
      />
      {predictionResults.length > 0 && (
        <ul className="w-full flex flex-col absolute top-[105px] bg-custom-gray rounded-[10px] z-50">
          {predictionResults.map(({place_id, description}) => {
            return (
              <li
                key={place_id}
                className="px-2 py-1.5 cursor-pointer hover:bg-gray rounded-[10px]"
                onClick={() => handleSuggestionClick(description, place_id)}>
                {description}
              </li>
            );+
          })}
        </ul>
      )}
    </div>
  )
}

export default CityInput;
