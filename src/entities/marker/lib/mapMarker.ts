import { FeatureCollection, Feature } from '../api/types';
import { Marker } from '../model/types';

export function mapMarker(featureCollection: FeatureCollection): Marker[] {
  return featureCollection.features.map(mapFeatureToMarker);
}

function mapFeatureToMarker(feature: Feature): Marker {
  const { id, properties, geometry } = feature;
  const { name, address, description, start_date, end_date } = properties;
  const { type, coordinates } = geometry;

  return {
    id,
    name,
    address,
    description,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    geometry: {
      type,
      coordinates,
    },
  };
}
