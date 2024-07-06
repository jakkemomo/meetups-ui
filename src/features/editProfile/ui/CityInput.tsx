import { LabeledInput } from "@/shared";
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { ICityLocation } from "@/shared/model/types";

interface ICityInputProps {
  onChange: (arg: ICityLocation) => void;
}

function CityInput({ onChange }: ICityInputProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [predictionResults, setPredictionResults] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const places = useMapsLibrary('places');

  const {
    formState: { errors },
    clearErrors,
    getValues,
    setValue
  } = useFormContext<EditProfileValidationSchema>();

  const cityValue = getValues('city');

  useEffect(() => {
    if (!places) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(document.createElement('div')));
  }, [places]);

  useEffect(() => {
    if (!cityValue) return;

    setInputValue(cityValue);
  }, [cityValue]);

  const getDetailsFromPlaceService = (
    detailRequestOptions: { placeId: string; fields: string[] },
    detailsRequestCallback: (placeDetails: google.maps.places.PlaceResult | null) => void
  ) => {
    placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
  }

  const fetchPredictions = async (inputValue: string) => {
    if (!autocompleteService || !inputValue) {
      setPredictionResults([]);
      return;
    }

    const request: google.maps.places.AutocompletionRequest = {
      input: inputValue,
      types: ['locality']
    };

    const response = await autocompleteService.getPlacePredictions(request);

    return response;
  }

  const handleSuggestionClick = (placeId: string) => {
    setPredictionResults([]);

    const detailRequestOptions = {
      placeId,
      fields: ['geometry', 'formatted_address']
    };

    const detailsRequestCallback = (
      placeDetails: google.maps.places.PlaceResult | null
    ) => {
      if (!placeDetails?.geometry?.location || !placeDetails.geometry.viewport) return;

      setPredictionResults([]);
      setInputValue(placeDetails.formatted_address ?? '');
      setValue('city', placeDetails.formatted_address ?? '', { shouldDirty: true });

      clearErrors('city_location');

      const location = placeDetails.geometry.location.toJSON();
      const north_east_point = placeDetails.geometry.viewport.getNorthEast();
      const south_west_point = placeDetails.geometry.viewport.getSouthWest();

      const city_location: ICityLocation = {
        place_id: placeId,
        location: {
          latitude: String(location.lat),
          longitude: String(location.lng)
        },
        south_west_point: {
          latitude: String(north_east_point.lat()),
          longitude: String(north_east_point.lng())
        },
        north_east_point: {
          latitude: String(south_west_point.lat()),
          longitude: String(south_west_point.lng())
        }
      }

      onChange(city_location);
    };

    getDetailsFromPlaceService(detailRequestOptions, detailsRequestCallback);
  }

  const onInputChange = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement)?.value;

    setInputValue(value);

    if (!value) {
      setValue('city', '', { shouldDirty: true });
      return;
    }

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
        autoComplete="off"
      />
      {predictionResults.length > 0 && (
        <ul className="w-full flex flex-col absolute top-[105px] bg-custom-gray rounded-[10px] z-50">
          {predictionResults.map(({place_id, description}) => {
            return (
              <li
                key={place_id}
                className="px-2 py-1.5 cursor-pointer hover:bg-gray rounded-[10px]"
                onClick={() => handleSuggestionClick(place_id)}>
                {description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
}

export default CityInput;
