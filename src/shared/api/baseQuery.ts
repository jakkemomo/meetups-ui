import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {config} from '../config'
import {FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {selectAccessToken} from "@/shared/lib";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: config.BASE_URL_API,
  prepareHeaders: (headers) => {
    let accessToken = selectAccessToken();

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
})
