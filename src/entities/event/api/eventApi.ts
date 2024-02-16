import { baseApi } from "@/shared/api";
import { IEvent } from "../model/types";

interface IApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

interface IApiRequest {
  search?: string;
}

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IApiRequest>({
      query: ({ search }) => ({
        url: '/events/',
        method: 'GET',
        params: {
          search
        }
      })
    })
  })
})

export const { useGetEventsQuery } = eventApi;
