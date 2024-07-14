import { useAppDispatch } from "@/shared/model";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import { ReactElement, useCallback, useEffect } from "react";

interface IImplementMarkerMapControlProps {
  onMapClick?: ({ latitude, longitude }: { latitude: number, longitude: number }) => void;
}

function ImplementMarkerMapControl({ onMapClick }: IImplementMarkerMapControlProps): ReactElement {
  const map = useMap();
  const dispatch = useAppDispatch();

  const addImplementMarkerListener = useCallback(
    (mapMouseEvent: google.maps.MapMouseEvent) => {
      if (!mapMouseEvent.latLng?.lng || !mapMouseEvent.latLng?.lat) return;

      const lng = mapMouseEvent.latLng.lng();
      const lat = mapMouseEvent.latLng.lat();

      onMapClick && onMapClick({ latitude: lat, longitude: lng });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
