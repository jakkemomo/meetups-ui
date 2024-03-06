import { useAppDispatch } from "@/shared/model";
import { autocompleteServiceSetted, placesServiceSetted } from "@/widgets/mapWidget/model/addressControlSlice";
import { ControlPosition, MapControl, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { ReactElement, useEffect } from "react";

export function CustomMapControl(): ReactElement {
  const map = useMap('map');
  const places = useMapsLibrary('places');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!places || !map) return;

    dispatch(autocompleteServiceSetted(new places.AutocompleteService()));
    dispatch(placesServiceSetted(new places.PlacesService(map)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, places]);

  return (
    <MapControl position={ControlPosition.TOP}></MapControl>
  )
}
