import { baseApi } from "@/shared/api";
import {IDetailedEvent, IEditEventRequest, IEvent, IGetEventRequest} from "../model/types";
import { IApiResponse } from "@/shared/types";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { CITIES_TAG, EVENTS_TAG } from "@/shared/api/tags";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: (params) => ({
        url: '/events/',
        method: 'GET',
        params
      }),
      providesTags: ['EVENTS_TAG']
    }),
    getEvent: build.query<IDetailedEvent, number>({
      query: (id) => ({
        url: `/events/${id}/`,
        method: 'GET'
      }),
      providesTags: [EVENTS_TAG]
    }),
    createEvent: build.mutation<void, Partial<AddEventValidationSchema>>({
      query: (eventInfo) => ({
        url: '/events/',
        method: 'POST',
        body: eventInfo
      }),
      invalidatesTags: [CITIES_TAG]
    }),
    editEvent: build.mutation<void, IEditEventRequest>({
      query: ({ eventInfo, eventId }) => ({
        url: `/events/${eventId}/`,
        method: 'PATCH',
        body: eventInfo
      }),
      invalidatesTags: [EVENTS_TAG, CITIES_TAG]
    }),
    registerToEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/register/`,
        method: 'POST'
      }),
    }),
    leaveFromEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/leave/`,
        method: 'POST'
      }),
    }),
    likeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'POST'
      }),
      invalidatesTags: [EVENTS_TAG]
    }),
    unlikeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'DELETE'
      }),
      invalidatesTags: [EVENTS_TAG]
    }),
    getUserCreatedEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: ({ user_id, ...params }) => ({
        url: `users/${user_id}/events/created/`,
        method: 'GET',
        params
      }),
      providesTags: [EVENTS_TAG]
    }),
    getUserPlannedEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: ({ user_id, search }) => ({
        url: `users/${user_id}/events/planned/`,
        method: 'GET',
        params: { search }
      }),
      providesTags: [EVENTS_TAG]
    }),
    getUserFinishedEvents: build.query<IApiResponse<IEvent[]>, number>({
      query: (user_id) => ({
        url: `users/${user_id}/events/finished/`,
        method: 'GET'
      }),
      providesTags: [EVENTS_TAG]
    }),
    getUserFavotireEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: ({ user_id, search }) => ({
        url: `users/${user_id}/events/favorited/`,
        method: 'GET',
        params: { search }
      }),
      providesTags: [EVENTS_TAG]
    }),
  })
})

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useEditEventMutation,
  useRegisterToEventMutation,
  useLeaveFromEventMutation,
  useLikeEventMutation,
  useUnlikeEventMutation,
  useGetUserCreatedEventsQuery,
  useGetUserPlannedEventsQuery,
  useGetUserFinishedEventsQuery,
  useGetUserFavotireEventsQuery
} = eventApi;
