import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "./addEventFormSchema";
import { IOnSelectAddressArgs } from "@/entities/event/model/types";

interface IUseFormActions {
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export const useFormActions = ({ setValue, clearErrors }: IUseFormActions) => {
  const onSelectAddress = ({ city, country, geometry, place_id }: IOnSelectAddressArgs) => {
    if (!geometry?.location || !geometry.viewport) return;

    const location = geometry.location.toJSON();
    const northEastPoint = geometry.viewport.getNorthEast();
    const southWestPoint = geometry.viewport.getSouthWest();

    setValue('city', city, { shouldDirty: true });
    setValue('country', country, { shouldDirty: true });
    setValue('city_location.location', { latitude: String(location.lat), longitude: String(location.lng) }, { shouldDirty: true });
    setValue('city_location.north_east_point', { latitude: String(northEastPoint.lat()), longitude: String(northEastPoint.lng()) }, { shouldDirty: true });
    setValue('city_location.south_west_point', { latitude: String(southWestPoint.lat()), longitude: String(southWestPoint.lng()) }, { shouldDirty: true });
    setValue('city_location.place_id', place_id, { shouldDirty: true });
    clearErrors(['address', 'city']);
  }

  return {
    onSelectAddress
  }
}
