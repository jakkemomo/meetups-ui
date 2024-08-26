import {createApi} from '@reduxjs/toolkit/query/react'
import {allTags} from './tags'
import {baseQuery} from "./baseQuery";
import {AccessToken, AccessTokenDto, RefreshToken} from "../model/types";
import {mapAccessToken} from "../lib/mapSession";
import {baseQueryWithReauth} from "./baseQueryWithReauth";

export const baseApi = createApi({
  tagTypes: allTags,
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
