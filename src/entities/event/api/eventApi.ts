import { baseApi } from "@/shared/api";
import { IEvent } from "../model/types";

interface IApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, string>({
      query: (filter) => ({
        url: '/events/',
        method: 'GET',
        params: {
          search: filter
        }
      })
    })
  })
})

export const { useGetEventsQuery } = eventApi;