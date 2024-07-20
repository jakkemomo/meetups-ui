import { baseApi } from "@/shared/api";
import { IApiResponse } from "@/shared/types";

const cityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<IApiResponse<{ place_id: string }[]>, void>({
      query: () => ({
        url: '/city/',
        method: 'GET'
      })
    })
  })
})

export const {
  useGetCitiesQuery
} = cityApi;
