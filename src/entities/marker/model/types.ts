export type Marker = {
  id: Id;
  name: string;
  address: string;
  description: string;
  startDate: Date;
  endDate: Date;
  geometry: {
    type: string;
    coordinates: number[];
  };
};
