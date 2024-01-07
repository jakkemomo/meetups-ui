import { FC, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';

import styles from './Map.module.scss';
import {useGetMarkersQuery} from "@/entities/marker/api/markerApi";
import {GOOGLE_MAP_ID, GOOGLE_MAP_API_KEY} from "@/shared/config";

const MapComponent: FC = () => {
  const position = { lat: 53.91228, lng: 27.431831 };
  const { data: events, isSuccess } = useGetMarkersQuery(); // Updated usage
  const [open, setOpen] = useState<number | null | boolean>(null);

  const eventsArr = events?.map((marker) => ({
    lat: marker.geometry.coordinates[1],
    lng: marker.geometry.coordinates[0],
  })) || [];

  return (
    <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
      <Map zoom={12} center={position} mapId={GOOGLE_MAP_ID} className={styles.map}>
        {eventsArr.map((event, index) => (
          <AdvancedMarker
            position={event}
            key={index}
            onClick={() => setOpen((prevIndex) => (prevIndex === index ? null : index))}
          >
            {open === index && (
              <InfoWindow className={styles.info_window} position={event} onCloseClick={() => setOpen(null)}>
                {events?.map((marker, i) =>
                  i === index ? (
                    <div key={i}>
                      <p className={styles.info_window_p}>{marker.name}</p>
                      <p className={styles.info_window_p}>{marker.address}</p>
                      <p className={styles.info_window_p}>{new Date(marker.startDate).toLocaleString()}</p>
                      <p className={styles.info_window_p}>{new Date(marker.endDate).toLocaleString()}</p>
                      <button className={styles.info_window_button}>join</button>
                    </div>
                  ) : null
                )}
              </InfoWindow>
            )}
            <Pin borderColor={'brown'} />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}

export default MapComponent;
