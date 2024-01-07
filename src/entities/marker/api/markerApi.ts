import { baseApi } from '@/shared/api'
import { mapMarker } from '../lib/mapMarker'
import type { FeatureCollection } from './types'
import type {Marker} from "../model/types";

export const markerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMarkers: build.query<Marker[], void>({
      query: () => ({
        url: `/markers/`,
      }),
      transformResponse: (response: FeatureCollection) => mapMarker(response)
    }),
  }),
});

export const { useGetMarkersQuery } = markerApi;
