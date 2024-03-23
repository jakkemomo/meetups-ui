import { baseApi } from "@/shared/api";
import { IEvent } from "../model/types";
import { IApiResponse } from "@/shared/types";

interface IApiRequest {
  search?: string;
  categories?: string;
}

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IApiRequest>({
      query: ({ search, categories }) => ({
        url: '/events/',
        method: 'GET',
        params: {
          search,
          category__name__in: categories
        }
      })
    })
  })
})

export const { useGetEventsQuery } = eventApi;
