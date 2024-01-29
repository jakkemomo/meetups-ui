import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import {PROFILE_TAG, SESSION_TAG} from './tags'
import {baseQuery} from "./baseQuery.ts";
import {AccessToken, AccessTokenDto, RefreshToken} from "../model/types.ts";
import {mapAccessToken} from "../lib/mapSession.ts";

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, PROFILE_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

export const jwtApi = createApi({
  reducerPath: 'jwt',
  baseQuery,
  endpoints: (build) => ({
    refreshAccessToken: build.mutation<AccessToken, RefreshToken>({
      query: (body: RefreshToken) => ({
        url: `/token/refresh/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: AccessTokenDto) => mapAccessToken(response),
    })
  })
})