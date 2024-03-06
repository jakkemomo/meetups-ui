import { useAppSelector } from '@/shared/model';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

export function MapHandler() {
  const map = useMap();
  const { selectedPlace } = useAppSelector((state) => state.addressControl);

  useEffect(() => {
    if (!map || !selectedPlace) return;

    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry?.viewport);
    }
  }, [map, selectedPlace]);

  return null;
}
