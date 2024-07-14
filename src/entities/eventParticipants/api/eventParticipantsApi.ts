import { baseApi } from "@/shared/api";
import { IKickParticipantRequest, IParticipant } from "../model/types";
import { IApiResponse } from "@/shared/types";

interface IParticipantsRequest {
  event_id: number;
  search: string;
  offset?: number;
  owner: IParticipant;
}

const eventParticipantsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEventParticipants: build.query<IApiResponse<IParticipant[]>, IParticipantsRequest>({
      query: ({ event_id, search = '', offset }) => ({
        url: `/events/${event_id}/participants/`,
        method: 'GET',
        params: {
          search,
          limit: 10,
          offset
        }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'PARTICIPANTS_TAG' as const, id })),
              { type: 'PARTICIPANTS_TAG', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'PARTICIPANTS_TAG', id: 'PARTIAL-LIST' }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.offset === 0) {
          return newItems;
        } else {
          return {...newItems, results: [...currentCache.results, ...newItems.results]};
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset
      }
    }),
    kickParticipant: build.mutation<void, IKickParticipantRequest>({
      query: ({ event_id, user_id }) => ({
        url: `/events/${event_id}/kick/${user_id}/`,
        method: 'POST'
      })
    })
  })
})

export const {
  useGetEventParticipantsQuery,
  useKickParticipantMutation
} = eventParticipantsApi;
