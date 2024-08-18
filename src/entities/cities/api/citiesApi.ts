import { baseApi } from "@/shared/api";
import { IApiResponse } from "@/shared/types";
import { ICity } from "../model/types";
import { CITIES_TAG } from "@/shared/api/tags";

const citiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<IApiResponse<ICity[]>, { search?: string }>({
      query: (params) => ({
        url: '/cities/',
        method: 'GET',
        params: {
          ...params,
          limit: 5,
          country_name: 'Russia'
        }
      })
    }),
    getAvailableCities: build.query<IApiResponse<ICity[]>, { search?: string }>({
      query: (params) => ({
        url: '/cities/available/',
        method: 'GET',
        params: {
          ...params,
          limit: 10
        }
      }),
      providesTags: [CITIES_TAG]
    }),
  })
})

export const {
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useGetAvailableCitiesQuery
} = citiesApi;
