import { baseApi } from "@/shared/api";
import {IDetailedEvent, IEditEventRequest, IEvent, IGetEventRequest} from "../model/types";
import { IApiResponse } from "@/shared/types";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";

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
      providesTags: ['EVENTS_TAG']
    }),
    createEvent: build.mutation<void, Partial<AddEventValidationSchema>>({
      query: (eventInfo) => ({
        url: '/events/',
        method: 'POST',
        body: eventInfo
      }),
    }),
    editEvent: build.mutation<void, IEditEventRequest>({
      query: ({ eventInfo, eventId }) => ({
        url: `/events/${eventId}/`,
        method: 'PATCH',
        body: eventInfo
      }),
      invalidatesTags: ['EVENTS_TAG']
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
      invalidatesTags: ['EVENTS_TAG']
    }),
    unlikeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['EVENTS_TAG']
    }),
    getUserCreatedEvents: build.query<IApiResponse<IEvent[]>, number>({
      query: (user_id) => ({
        url: `users/${user_id}/events/created/`,
        method: 'GET'
      }),
      providesTags: ['EVENTS_TAG']
    }),
    getUserPlannedEvents: build.query<IApiResponse<IEvent[]>, number>({
      query: (user_id) => ({
        url: `users/${user_id}/events/planned/`,
        method: 'GET'
      }),
      providesTags: ['EVENTS_TAG']
    }),
    getUserFinishedEvents: build.query<IApiResponse<IEvent[]>, number>({
      query: (user_id) => ({
        url: `users/${user_id}/events/finished/`,
        method: 'GET'
      }),
      providesTags: ['EVENTS_TAG']
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
  useGetUserFinishedEventsQuery
} = eventApi;
