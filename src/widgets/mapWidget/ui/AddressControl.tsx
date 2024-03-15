import { useAppDispatch, useAppSelector } from "@/shared/model";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { FormEvent, ReactElement, useState } from "react";
import { implementMarkerSetted, selectedPlaceSetted } from "../model/addressControlSlice";
import { Input } from "@/shared";

export function AddressControl(): ReactElement {
  const places = useMapsLibrary('places');
  const [inputValue, setInputValue] = useState('');
  const [predictionResults, setPredictionResults] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const { placesService, autocompleteService } = useAppSelector((state) => state.addressControl);
  const dispatch = useAppDispatch();

  const handleSuggestionClick = (placeId: string) => {
    if (!places) return;

    const detailRequestOptions = {
      placeId,
      fields: ['geometry', 'name', 'formatted_address']
    };

    const detailsRequestCallback = (
      placeDetails: google.maps.places.PlaceResult | null
    ) => {
      dispatch(selectedPlaceSetted(placeDetails));
      setPredictionResults([]);
      setInputValue(placeDetails?.formatted_address ?? '');

      if (!placeDetails?.geometry?.location?.lng || !placeDetails.geometry.location.lat) return;

      const lng = placeDetails.geometry.location.lng();
      const lat = placeDetails.geometry.location.lat();

      dispatch(implementMarkerSetted({lng, lat}));
    };

    placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
  }

  const fetchPredictions = async (inputValue: string) => {
    if (!autocompleteService || !inputValue) {
      setPredictionResults([]);
      return;
    }

    const request = {input: inputValue};
    const response = await autocompleteService.getPlacePredictions(request);

    return response;
  }

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement)?.value;

    setInputValue(value);
    fetchPredictions(value)
    .then((res) => res && setPredictionResults(res.predictions))
    .catch((err) => console.log(err));
  }

  return (
    <>
      <h3 className="text-[20px] font-normal leading-[25.1px] mb-[7px]">Адрес</h3>
      <div className="relative">
        <Input HTMLType="search" value={inputValue} onChange={onInputChange} placeholder="Введите адрес" extraContentClass="p-2.5" />
        {predictionResults.length > 0 && (
          <ul className="flex flex-col absolute bg-custom-gray rounded-[10px] z-50">
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
