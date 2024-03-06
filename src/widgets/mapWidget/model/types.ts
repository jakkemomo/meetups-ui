interface ICrsProperties {
  name: string;
}

export interface ICrs {
  type: string;
  properties: ICrsProperties;
}

interface IFeaturesProperties {
  name: string;
  address: string;
  description: string;
  start_date: string;
  end_date: string | null;
}

interface IFeaturesGeometry {
  type: string;
  coordinates: number[];
}

export interface IFeatures {
  type: string;
  id: number;
  properties: IFeaturesProperties;
  geometry: IFeaturesGeometry;
}
