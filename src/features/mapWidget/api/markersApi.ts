import { baseApi } from "@/shared/api";
import { ICrs, IFeatures } from "../model/types";

interface IApiResponse {
  type: string;
  crs: ICrs;
  features: IFeatures[];
}

const markersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMarkers: build.query<IApiResponse, void>({
      query: () => ({
        url: '/markers/',
        method: 'GET'
      })
    })
  })
})

export const { useGetMarkersQuery } = markersApi;
