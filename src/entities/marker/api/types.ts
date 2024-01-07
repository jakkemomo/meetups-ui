type Crs = {
    type: string;
    properties: {
        name: string;
    };
};

export type  Geometry = {
    type: string;
    coordinates: number[];
};

export type  Properties = {
    name: string;
    address: string;
    description: string;
    start_date: string;
    end_date: string;
};

export type  Feature = {
    type: string;
    id: number;
    properties: Properties;
    geometry: Geometry;
};

export type FeatureCollection = {
    type: string;
    crs: Crs;
    features: Feature[];
};
