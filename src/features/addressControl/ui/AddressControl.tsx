import { useAppDispatch, useAppSelector } from "@/shared/model";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { selectedPlaceSetted } from "../model/addressControlSlice";
import { LabeledInput } from "@/shared";
import { useFormContext } from "react-hook-form";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";

export function AddressControl(): ReactElement {
  const places = useMapsLibrary('places');
  const [inputValue, setInputValue] = useState('');
  const [predictionResults, setPredictionResults] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const { placesService, autocompleteService } = useAppSelector((state) => state.addressControl);
  const dispatch = useAppDispatch();

  const {
    setValue,
    formState: { errors },
    clearErrors,
    watch
  } = useFormContext<AddEventValidationSchema>();

  const addressFormValue = watch('address');

  useEffect(() => {
    setInputValue(addressFormValue);
  }, [addressFormValue]);

  const fetchPredictions = async (inputValue: string) => {
    if (!autocompleteService || !inputValue) {
      setPredictionResults([]);
      return;
    }

    const request = { input: inputValue };
    const response = await autocompleteService.getPlacePredictions(request);

    return response;
  }

  const getDetailsFromPlaceService = (
    detailRequestOptions: google.maps.places.PlaceDetailsRequest,
    detailsRequestCallback: (placeDetails: google.maps.places.PlaceResult | null) => void
  ) => {
    placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
  }

  const handleSuggestionClick = (placeId: string) => {
    if (!places) return;

    const detailRequestOptions: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields: ['geometry', 'address_components', 'formatted_address']
    };

    const detailsRequestCallback = (
      placeDetails: google.maps.places.PlaceResult | null
    ) => {
      if (!placeDetails?.geometry?.location) return;

      dispatch(selectedPlaceSetted(placeDetails));
      setPredictionResults([]);
      setInputValue(placeDetails.formatted_address ?? '');

      setValue('address', placeDetails.formatted_address ?? '', { shouldDirty: true });

      const location = placeDetails.geometry.location.toJSON();

      setValue('location', { latitude: String(location.lat), longitude: String(location.lng) }, { shouldDirty: true });

      clearErrors(['address', 'city']);
    };

    getDetailsFromPlaceService(detailRequestOptions, detailsRequestCallback);
  }

  const onInputChange = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement)?.value;

    if (!value) {
      setValue('address', '');
    }

    setInputValue(value);
    fetchPredictions(value)
      .then((res) => res && setPredictionResults(res.predictions))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="w-[480px] relative">
        <LabeledInput
          value={inputValue}
          onChange={onInputChange}
          isError={!!(errors.address ?? errors.city)}
          errorMessage={errors.address?.message ?? errors.city?.message}
          extraErrorClass="ml-[22px]"
          type="search"
          placeholder="Введите адрес"
          className="w-full text-[18px] mt-[7px]"
          size="lg"
          autoComplete="off"
          labelText="Адрес"
          extraLabelClass="text-[20px]"
        />
        {predictionResults.length > 0 && (
          <ul className="w-full flex flex-col absolute top-[90px] bg-custom-gray rounded-[10px] z-50">
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
    </>
  )
}
