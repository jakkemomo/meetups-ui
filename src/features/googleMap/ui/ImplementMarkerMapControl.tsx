import { useAppDispatch } from "@/shared/model";
import { implementMarkerSetted } from "@/widgets/mapWidget/model/addressControlSlice";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import { ReactElement, useCallback, useEffect } from "react";

function ImplementMarkerMapControl(): ReactElement {
  const map = useMap();
  const dispatch = useAppDispatch();

  const addImplementMarkerListener = useCallback(
    (mapMouseEvent: google.maps.MapMouseEvent) => {
      if (!mapMouseEvent.latLng?.lng || !mapMouseEvent.latLng?.lat) return;

      const lng = mapMouseEvent.latLng.lng();
      const lat = mapMouseEvent.latLng.lat();

      dispatch(implementMarkerSetted({lng, lat}));
    }, [dispatch]
  )

  useEffect(() => {
    if (!map) return;

    map.addListener('click', addImplementMarkerListener);
  }, [map, addImplementMarkerListener]);

  return (
    <MapControl position={ControlPosition.TOP}></MapControl>
  )
}

export default ImplementMarkerMapControl;
