import {baseApi, SESSION_TAG} from '@/shared/api'
import {mapSession} from '@/shared/lib/mapSession.ts'
import {RefreshToken, RequestLoginBody, Session, SessionDto} from "@/shared/model/types.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionDto) => mapSession(response),
    }),
    logout: build.mutation<{}, RefreshToken>({
      query: (body) => ({
        url: `/logout/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
}),
})
