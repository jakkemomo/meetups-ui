import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {config} from '../config'
import {FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: config.BASE_URL_API,
  prepareHeaders: (headers, { getState }) => {
    const { access } = (getState() as RootState).session;

    if (access) {
      headers.set('Authorization', `Bearer ${access}`);
    }

    return headers;
  },
})
