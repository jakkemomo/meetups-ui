import { useAppDispatch } from "@/shared/model";
import { autocompleteServiceSetted, placesServiceSetted } from "@/widgets/mapWidget/model/addressControlSlice";
import { ControlPosition, MapControl, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { ReactElement, useEffect } from "react";

export function AddressMapControl(): ReactElement {
  const map = useMap();
  const places = useMapsLibrary('places');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!places || !map) return;

    dispatch(autocompleteServiceSetted(new places.AutocompleteService()));
    dispatch(placesServiceSetted(new places.PlacesService(map)));
  }, [map, places, dispatch]);

  return (
    <MapControl position={ControlPosition.TOP}></MapControl>
  )
}
