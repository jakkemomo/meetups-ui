
import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { config } from '@/shared/config'
import {FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: config.BASE_URL_API,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).session

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})
